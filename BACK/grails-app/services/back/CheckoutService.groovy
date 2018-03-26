package back

import grails.gorm.transactions.Transactional
import user.UserNotFoundException

@Transactional(readOnly = true)
class CheckoutService {

    def userService

    @Transactional
    def save(String username, String observation, detailCheckout){
        def dateOrder = new Date()
        User user = User.findByUsername(username)
        if (user == null) {
            throw new UserNotFoundException("Usuario inexistente.")
        }
        Checkout checkout = new Checkout(observation:observation, dateOrder: dateOrder, user:user)
        Double totalAmount = 0
        boolean hasError = false
        detailCheckout.each{ it ->
            CheckoutDetail checkoutDetail = new CheckoutDetail()
            Item item = Item.findByItemId(it.id)
            checkoutDetail.item = item
            checkoutDetail.price = item.price
            totalAmount+= item.price
            checkoutDetail.quantity = it.quantity
            checkoutDetail.checkout = checkout
            checkoutDetail.validate()
            checkout.addTo('checkoutDetail', checkoutDetail)
        }
        checkout.totalAmount = totalAmount
        checkout.userPoints = updateUserPoints(user, totalAmount)
        checkout.validate()
        checkout.save()
        return checkout

    }


    @Transactional
    def updateUserPoints(User user, Double amount){
        def loyaltyPoints = 0
        if(user != null){
            loyaltyPoints = (Integer) amount * 0.10
            user.loyaltyPoints+= loyaltyPoints
            user.save()
        }
        return loyaltyPoints
    }
}
