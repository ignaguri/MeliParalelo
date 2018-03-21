package back

class User {
    String username
    String password
    String name
    String lastname
    Date birthdate
    int loyaltyPoints

    static hasMany = [preferencies: groovy.lang.Category]

    static constraints = {
        username blank: false, nullable: false, unique: true, size: 4..30
        password blank: false, nullable: false
        name blank: false, nullable: false
        lastname blank: false, nullable: false
        loyaltyPoints min: 0, default: 0
    }

    String getUsername() {
        return username
    }

    void setUsername(String username) {
        this.username = username
    }

    String getPassword() {
        return password
    }

    void setPassword(String password) {
        this.password = password
    }

    String getName() {
        return name
    }

    void setName(String name) {
        this.name = name
    }

    String getLastname() {
        return lastname
    }

    void setLastname(String lastname) {
        this.lastname = lastname
    }

    Date getBirthdate() {
        return birthdate
    }

    void setBirthdate(Date birthdate) {
        this.birthdate = birthdate
    }

    int getLoyaltyPoints() {
        return loyaltyPoints
    }

    void setLoyaltyPoints(int loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints
    }

    static getHasMany() {
        return hasMany
    }

    static void setHasMany(hasMany) {
        User.hasMany = hasMany
    }


    @Override
    public String toString() {
        return username
    }
}