package back

import grails.converters.JSON
import groovy.sql.Sql
import item.ItemNotFoundException
import org.springframework.http.HttpStatus
import user.UserNotFoundException

class VisitController {

    VisitService visitService
    UserService userService

    def index() {

        String username = params.get('username')

        User user = User.findByUsername(username)

        if(user == null) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: "Usuario inexistente."] as JSON)
        }

        try {
            response.status = HttpStatus.OK.value()
            respond visitService.list(params)
        } catch (Exception e) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: e.message] as JSON)
        }
    }

    def show() {

        String username = params.get('username')
        String itemID = params.get('id')

        User user = User.findByUsername(username)

        if(user == null) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: "Usuario inexistente."] as JSON)
        }

        Item item = Item.findByItemId(itemID)

        if(item == null) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: "Item inexistente."] as JSON)
        }

        //Busco la visita
        Visit visit = Visit.findByUserAndItem(user, item)

        if(visit == null) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: "Visita inexistente."] as JSON)
        }

        //Response
        response.status = HttpStatus.OK.value()
        respond visit
    }

    def generateStatistics() {

        String username = params.get('username')

        //Verifico usuario no autorizado
        if(!userService.checkUserAdmin(username)) {
            response.status = HttpStatus.UNAUTHORIZED.value()
            render([error: 'Usuario no autorizado.'] as JSON)
        }

        def resultData = ""

        try {

            resultData = visitService.queryVisitsAndPurchases()

        } catch (Exception e) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: e.message] as JSON)
        }

        response.status = HttpStatus.OK.value()
        withFormat {
            json {
                render resultData as JSON
            }
        }
    }
}
