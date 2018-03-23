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
        JSON.registerObjectMarshaller(Item) {

            def output = [:]
            def outputPicture = []

            it.pictures.each {
                outputPicture.push(Picture.findById(it.id).url)
            }

            output['id'] = it.itemId
            output['title'] = it.title
            output['price'] = it.price
            output['original_price'] = it.originalPrice
            output['initial_quantity'] = it.initialQuantity
            output['available_quantity'] = it.availableQuantity
            output['sold_quantity'] = it.soldQuantity
            output['condition_item'] = it.conditionItem
            output['thumbnail'] = it.thumbnail
            output['category_id'] = it.categoryId
            output['state_name'] = it.stateName
            output['accepts_mercadopago'] = it.acceptsMP
            output['qualification'] = it.qualification
            output['description'] = it.description
            output['pictures'] = outputPicture
            return output
        }

        def responseData
        try {
            response.status = HttpStatus.OK.value()
            responseData = itemService.list(params)
        } catch(Exception e) {
            response.status = HttpStatus.BAD_REQUEST.value()
            responseData = [
                    "error": e.message
            ]

        }

        withFormat {
            json {
                render responseData as JSON
            }
        }

    }

    def show() {

        String itemId = params.get('id')

        Item item = Item.findByItemId(itemId)

        def responseData = ""

        if (item != null) {
            //Encontro el item
            response.status = HttpStatus.OK.value()
            responseData = [
                item
            ]

        } else {
            //Item inexistente
            response.status = HttpStatus.NOT_FOUND.value()
            responseData = [
                "error": "No se encontro el item con ID "+itemId+"."
            ]
        }

        withFormat {
            json {
                render responseData as JSON
            }
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
                "category": params.category,
                "condition": params.condition,
                "price_min": params.price_min,
                "price_max": params.price_max,
                "statename": params.statename
        ]



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
