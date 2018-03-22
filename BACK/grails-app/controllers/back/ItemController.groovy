package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)

class ItemController {

    ItemService itemService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)

        JSON.registerObjectMarshaller(Item) {

            def output = [:]
            def outputPicture = []

            it.pictures.each {
                outputPicture.push(Picture.findById(it.id).url)
            }

            output['id'] = it.siteId
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


        withFormat {
            json {
                render itemService.list(params) as JSON
            }
        }

    }

    def show(Long id) {
        respond itemService.get(id)
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