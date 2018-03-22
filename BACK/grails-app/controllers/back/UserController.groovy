package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import org.springframework.http.HttpStatus
import user.IncorrectPasswordException
import user.UserNotFoundException

@Transactional(readOnly = true)
class UserController {
    static allowedMethods = [save: "POST"]

    UserService userService

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

    def login() {
        String username = request.JSON.username
        String password = request.JSON.password

        def responseData = ""
        User user

        try {
            user = userService.login(username, password)

            //Armo la respuesta
            response.status = HttpStatus.OK.value()
            responseData = [
                "username": user.username,
                "name": user.name,
                "lastname": user.lastname
            ]

        } catch (UserNotFoundException e) {
            //Usuario inexistente
            response.status = HttpStatus.UNAUTHORIZED.value()
            responseData = [
                "error": e.message
            ]
        } catch (IncorrectPasswordException e) {
            //Password incorrecta
            response.status = HttpStatus.UNAUTHORIZED.value()
            responseData = [
                "error": e.message
            ]
        } catch (Exception e) {
            //Error inesperado
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            responseData = [
                "error": e.message
            ]
        }

        withFormat {
            json {
                render responseData as JSON
            }
        }
    }
}
