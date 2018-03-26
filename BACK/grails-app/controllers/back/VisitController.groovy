package back

import grails.converters.JSON
import groovy.sql.Sql
import item.ItemNotFoundException
import org.springframework.http.HttpStatus
import user.UserNotFoundException

class VisitController {

    VisitService visitService
    def dataSource

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

        //  ##  FALTA CONTROL DE USER ADMIN  ##  //

        def sql = new Sql(dataSource)

        def resultData = []

        try {
            def temp = sql.rows("SELECT t.Item as 'Item', SUM(t.Visitas) as 'Visits', SUM(t.Compras) as 'Purchases' FROM (SELECT itm.item_id as 'Item', SUM(chd.quantity) as 'Compras', 0 as 'Visitas' FROM checkout chk, checkout_detail chd, item itm WHERE chd.checkout_id = chk.id AND chd.item_id = itm.id GROUP BY itm.item_id UNION ALL SELECT itm.item_id as 'Item', 0 as 'Compras', vst.count as 'Visitas' FROM visit vst, item itm WHERE vst.item_id = itm.id) as t GROUP BY t.Item;")

            temp.each {
                resultData.push(JSON.parse(it.toString()))
            }
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
