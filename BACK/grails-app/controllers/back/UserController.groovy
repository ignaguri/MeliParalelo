package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import org.springframework.http.HttpStatus
import user.IncorrectPasswordException
import user.UserAlreadyExistsException
import user.UserCreationException
import user.UserNotFoundException

@Transactional(readOnly = true)
class UserController {
    static allowedMethods = [save: "POST"]

    UserService userService

    @Transactional
    def index() {

        boolean created
        def responseData = ""

        try {
            created = userService.createUser(request.JSON.username,
                    request.JSON.password,
                    request.JSON.name,
                    request.JSON.lastname,
                    request.JSON.email,
                    request.JSON.birthdate,
                    request.JSON.loyaltyPoints)
            response.status = HttpStatus.OK.value()
            responseData = ["created":created,
                            "error":""]
        } catch (UserCreationException e) {
            created = false
            response.status = 500
            responseData = [
                    "created": created,
                    "error": "Ocurrió un problema al crear el usuario."
            ]
        } catch (UserAlreadyExistsException e) {
            created = false
            response.status = 403
            responseData = [
                    "created": created,
                    "error": "El usuario ya existe."
            ]
        } catch (Exception e) {
            created = false
            response.status = 500
            responseData = [
                    "created": created,
                    "error": "Ocurrió un error inesperado."
            ]
        }

        withFormat {
            json {
                render responseData as JSON
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
