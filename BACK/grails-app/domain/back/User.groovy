package back

class User {
    String username
    String password
    String name
    String lastname
    String email
    String birthdate
    int loyaltyPoints
    Role role

    static hasMany = [preferencies: Category, comments: Comment]

    static constraints = {
        username blank: false, nullable: false, unique: true, size: 4..30
        password blank: false, nullable: false
        name blank: false, nullable: false
        lastname blank: false, nullable: false
        loyaltyPoints min: 0, default: 0
    }

    User(String username, String password, String name, String lastname, String email, String birthdate, int loyaltyPoints, Role role) {
        this.username = username
        this.password = password
        this.name = name
        this.lastname = lastname
        this.email = email
        this.birthdate = birthdate
        this.loyaltyPoints = loyaltyPoints
        this.role = role
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

    String getEmail() {
        return email
    }

    void setEmail(String email) {
        this.email = email
    }

    String getBirthdate() {
        return birthdate
    }

    void setBirthdate(String birthdate) {
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

    Role getRole() {
        return role
    }

    void setRole(Role role) {
        this.role = role
    }

    @Override
    public String toString() {
        return username + role
    }
}
