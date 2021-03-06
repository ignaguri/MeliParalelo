package back

import grails.gorm.transactions.Transactional
import user.IncorrectPasswordException
import user.UserAlreadyExistsException
import user.UserCreationException
import user.UserNotFoundException
import user.UserParametersException

@Transactional
class UserService {

    def serviceMethod() {

    }

    User createUser(String username, String password, String name, String lastname, String email, String birthdate, String points) {
        def user = User.findByUsername(username)

        if(user == null) {
            int loyaltyPoints = points == null || points.size() == 0 || points.equals("") ? 0 : points.toInteger()

            if(
                    (username == null || username.equals("") || username.length() < 4) ||
                    (password == null || password.equals("")) ||
                    (name == null || name.equals("")) ||
                    (lastname == null || lastname.equals(""))
                ) {
                throw new UserParametersException("parametros del usuario incorrectos")
            }

            User newUser = new User(username, password, name, lastname, email, birthdate, loyaltyPoints, Role.findByName('user'))
            newUser.validate()

            if(newUser.save()) {
                return newUser
            } else {
                println(newUser.errors)
                throw new UserCreationException("error al crear el usuario")
            }
        } else {
            throw new UserAlreadyExistsException("El usuario ya existe")
        }
    }

    User login(String username, String password) {

        def user = User.findByUsername(username)

        if (user == null) {
            // Usuario inexistente
            throw new UserNotFoundException("Usuario inexistente.")
        } else {
            // Usuario existente, verifico la contraseña
            if (!user.password.equals(password)) {
                // Contraseña Incorrecta
                throw new IncorrectPasswordException("Contraseña incorrecta.")
            }
        }

        // Contraseña Correcta
        return user
    }

    boolean checkUserExists(String username) {
        return User.findByUsername(username) == null ? false : true
    }

    boolean checkUserAdmin(String username) {
        return User.findByUsernameAndRole(username, Role.findByName('admin')) == null ? false : true
    }
}
