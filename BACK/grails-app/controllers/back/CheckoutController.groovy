package back

import grails.gorm.transactions.Transactional
import grails.converters.JSON


@Transactional(readOnly = true)
class CheckoutController {


    def save (){
        def observation = request.JSON.observation
        def totalAmount = request.JSON.total_amount
        def detailCheckout = request.JSON.detail_checkout
        println(detailCheckout)


        withFormat {
            json {
                render detailCheckout as JSON
            }
        }
    }
}
