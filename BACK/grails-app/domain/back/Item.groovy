package back

class Item {

    String itemId
    String title
    Double price
    Double originalPrice
    Integer initialQuantity
    Integer availableQuantity
    Integer soldQuantity
    String conditionItem
    String thumbnail
    String categoryId
    String stateName
    boolean acceptsMP
    Integer qualification
    String description

    static hasMany = [pictures: Picture]

    static mapping = {
        description sqlType: 'longText'
        pictures fetch: 'join'
    }

    static constraints = {
    }

    String toString() {
        return [
         itemId,
         title,
         price,
         originalPrice,
         initialQuantity,
         availableQuantity,
         soldQuantity,
         conditionItem,
         thumbnail,
         categoryId,
         pictures,
         stateName,
         acceptsMP,
         qualification,
         description
        ]
    }

}
