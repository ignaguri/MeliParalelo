package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import org.springframework.http.HttpStatus

import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)

class ItemController {

    ItemService itemService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {

        try {
            response.status = HttpStatus.OK.value()
            respond itemService.list(params)
        } catch (Exception e) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: e.message] as JSON)
        }
    }

    def show() {
        //http://localhost:8080/item/show/':itemID'?user=':userID'

        String itemId = params.get('id')

        Item item = Item.findByItemId(itemId)

        if (item != null) {
            response.status = HttpStatus.OK.value()
            respond item
        } else {
            //Item inexistente
            response.status = HttpStatus.NOT_FOUND.value()
            render([error: "No se encontraron datos del item "+itemId+"."] as JSON)
        }
    }

    def preferences() {

        // http://localhost:8080/item/preferences?categories=MLA5725,MLA1384

        def values
        def responseData = []

        if(params.categories != null) {
            values = params.categories.split(',')
            response.status = HttpStatus.OK.value()
        } else {
            responseData = [
                    "error": "Se esperaban parametros separados por coma"
            ]
            response.status = HttpStatus.BAD_REQUEST.value()
        }

        values.each {
            def itemAux = Item.findByCategoryId(it)
            if(itemAux != null)
                responseData.push(itemAux)
        }

        withFormat {
            json {
                render responseData as JSON
            }
        }
    }

    def filter() {

        def filters = [
                "category_id": ['category_id', params.category, ' = '],
                "condition_item": ['condition_item', params.condition, ' = '],
                "price_min": ['price', params.price_min, ' > '],
                "price_max": ['price', params.price_max, ' < '],
                "state_name": ['state_name', params.statename, ' = ']
        ]

        def item = itemService.filterItems(filters)

        withFormat {
            json {
                render item as JSON
            }
        }

    }

    def locations() {

        def locations = []

        def c = Item.createCriteria()
        locations = c.list {
            projections { //projection does the trick
                property('stateName')
            }
        } as Set

        withFormat {
            json {
                render locations as JSON
            }
        }
    }


    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'item.label', default: 'Item'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
