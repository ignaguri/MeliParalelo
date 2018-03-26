
package back

class CheckoutDetail {

    Item item
    Integer quantity
    Double price

    static belongsTo = [checkout: Checkout]

    static constraints = {
    }
}
