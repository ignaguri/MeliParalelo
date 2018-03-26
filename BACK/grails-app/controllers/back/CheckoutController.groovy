package back

import grails.gorm.transactions.Transactional
import grails.converters.JSON
import org.springframework.http.HttpStatus
import user.UserNotFoundException


@Transactional(readOnly = true)
class CheckoutController {

    def checkoutService

    @Transactional
    def save() {
        def observation = request.JSON.observation
        def detailCheckout = request.JSON.detail_checkout
        def username = request.JSON.username

        def hasErrors = false
        if (!username | !detailCheckout) {
            hasErrors = true
        }
        def responseData
        Checkout checkout

        if(hasErrors){
            response.status = HttpStatus.BAD_REQUEST.value()
            responseData = [
                    "error": g.message(code: 'default.blank.parameters')
            ]
        }else{
            try{
                checkout = checkoutService.save(username, observation, detailCheckout)
                if (!checkout.hasErrors()) {
                    response.status = HttpStatus.OK.value()
                    responseData = [
                            "checkout": checkout
                    ]
                }
            }catch(UserNotFoundException e){
                response.status = HttpStatus.UNAUTHORIZED.value()
                responseData = [
                        "error": e.message
                ]
            }
        }
        withFormat {
            json {
                render responseData as JSON
            }
        }
    }
}
