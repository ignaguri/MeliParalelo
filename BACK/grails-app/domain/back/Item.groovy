package back

class Item {

    String siteId
    String title
    Double price
    Integer availableQuantity
    String conditionItem
    String thumbnail
    String categoryId
    String pictureUrl
    String stateName

    //initial, available, sold
    //price, original price
    //pictures todas
    //accepts mercadopago
    //description

    //random qualification Generar random

    static constraints = {
    }

    String toString() {
        return [
                this.siteId,
                this.title,
                this.price,
                this.availableQuantity,
                this.conditionItem,
                this.thumbnail,
                this.categoryId,
                this.pictureUrl,
                this.stateName
        ]
    }
}
