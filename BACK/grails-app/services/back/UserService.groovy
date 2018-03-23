package back

import grails.gorm.transactions.Transactional
import user.IncorrectPasswordException
import user.UserAlreadyExistsException
import user.UserCreationException
import user.UserNotFoundException

@Transactional
class UserService {

    def serviceMethod() {

    }

    boolean createUser(String username, String password, String name, String lastname, String email, String birthdate, String points) {
        def user = User.findByUsername(username)
        boolean status

        if(user == null) {
            int loyaltyPoints = points == null || points.size() == 0 || points.equals("") ? 0 : points.toInteger()
            User newUser = new User(username, password, name, lastname, email, birthdate, loyaltyPoints)
            newUser.validate()
            if(newUser.save()){
                status = true
            }else{
                println(newUser.errors)
                throw new UserCreationException("error al crear el usuario")
            }
        } else {
            throw new UserAlreadyExistsException("El usuario ya existe")
            status = false
        }
        return status
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
