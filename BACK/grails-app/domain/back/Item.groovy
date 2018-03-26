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

    String getItemId() {
        return itemId
    }

    void setItemId(String itemId) {
        this.itemId = itemId
    }

    String getTitle() {
        return title
    }

    void setTitle(String title) {
        this.title = title
    }

    Double getPrice() {
        return price
    }

    void setPrice(Double price) {
        this.price = price
    }

    Double getOriginalPrice() {
        return originalPrice
    }

    void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice
    }

    Integer getInitialQuantity() {
        return initialQuantity
    }

    void setInitialQuantity(Integer initialQuantity) {
        this.initialQuantity = initialQuantity
    }

    Integer getAvailableQuantity() {
        return availableQuantity
    }

    void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity
    }

    Integer getSoldQuantity() {
        return soldQuantity
    }

    void setSoldQuantity(Integer soldQuantity) {
        this.soldQuantity = soldQuantity
    }

    String getConditionItem() {
        return conditionItem
    }

    void setConditionItem(String conditionItem) {
        this.conditionItem = conditionItem
    }

    String getThumbnail() {
        return thumbnail
    }

    void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail
    }

    String getCategoryId() {
        return categoryId
    }

    void setCategoryId(String categoryId) {
        this.categoryId = categoryId
    }

    String getStateName() {
        return stateName
    }

    void setStateName(String stateName) {
        this.stateName = stateName
    }

    boolean getAcceptsMP() {
        return acceptsMP
    }

    void setAcceptsMP(boolean acceptsMP) {
        this.acceptsMP = acceptsMP
    }

    Integer getQualification() {
        return qualification
    }

    void setQualification(Integer qualification) {
        this.qualification = qualification
    }

    String getDescription() {
        return description
    }

    void setDescription(String description) {
        this.description = description
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
