package back

class Category {

    String categoryId
    String name

    static constraints = {
    }

    String toString() {
        return [
                this.categoryId,
                this.name
        ]
    }
}