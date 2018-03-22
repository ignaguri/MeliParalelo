package back

class UserController {
    static allowedMethods = [save: "POST"]

    def index() {

        String username = request.JSON.username
        String password = request.JSON.password
        String name = request.JSON.name
        String lastname = request.JSON.lastname
        String email = request.JSON.email
        String birthdate = request.JSON.birthdate
        String points = request.JSON.loyaltyPoints

        User newUser = new User(username, password, name, lastname, email, birthdate, points);

        withFormat {
            json {
                render 'usuario'
            }
        }
    }


}
