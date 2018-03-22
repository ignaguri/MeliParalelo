package back

class Checkout {

    Date dateOrder
    String observation
    Double totalAmount


    static hasMany = ["checkoutDetail": CheckoutDetail]

    static constraints = {
    }
}
