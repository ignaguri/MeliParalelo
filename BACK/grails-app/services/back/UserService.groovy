package back

import grails.gorm.transactions.Transactional
import user.IncorrectPasswordException
import user.UserNotFoundException

@Transactional
class UserService {

    def serviceMethod() {

    }

    User login(String username, String password) {

        def user = User.findByUsername(username)

        if (user == null) {
            // Usuario inexistente
            println "Usuario inexistente"
            throw new UserNotFoundException("Usuario inexistente.")
        } else {
            // Usuario existente, verifico la contraseña

            if (!user.password.equals(password)) {
                // Contraseña Incorrecta
                println "Contraseña incorrecta"
                throw new IncorrectPasswordException("Contraseña incorrecta.")
            }
        }

        println "Usuario: " + user.toString()
        // Contraseña Correcta
        return user
    }

    private boolean checkUserExists(String username) {
        return User.findByUsername(username) == null ? false : true
    }
}
