package back

class Visit {

    User user
    Item item
    int count

    static constraints = {
        user nullable: false
        item nullable: false
        count min: 0
    }

    Visit(User user, Item item) {
        this.user = user
        this.item = item
        this.count = 1
    }

    User getUser() {
        return user
    }

    void setUser(User user) {
        this.user = user
    }

    Item getItem() {
        return item
    }

    void setItem(Item item) {
        this.item = item
    }

    int getCount() {
        return count
    }

    void setCount(int count) {
        this.count = count
    }


    @Override
    public String toString() {
        return count
    }
}
