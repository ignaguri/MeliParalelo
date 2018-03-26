package back

import grails.converters.JSON
import item.ItemNotFoundException
import org.springframework.http.HttpStatus
import user.UserNotFoundException

class VisitController {

    VisitService visitService

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
}
