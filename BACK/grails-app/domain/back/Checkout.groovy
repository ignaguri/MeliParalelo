package back

class Checkout {

    Date dateOrder
    String observation
    Double totalAmount
    Integer userPoints
    User user

    static hasMany = [checkoutDetail: CheckoutDetail]

    static constraints = {
        observation blank: true, nullable: true
        totalAmount min: 0d
    }
}
