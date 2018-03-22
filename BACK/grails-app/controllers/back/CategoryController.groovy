package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class CategoryController {

    CategoryService categoryService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)

        JSON.registerObjectMarshaller(Category) {
            def output = [:]
            output['id'] = it.categoryId
            output['name'] = it.name
            return output
        }

        withFormat {
            json {
                render categoryService.list(params) as JSON
            }
        }
    }

    def show(Long id) {
        respond categoryService.get(id)
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'category.label', default: 'Category'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
