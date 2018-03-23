package back

import grails.gorm.transactions.Transactional

@Transactional
class VisitService {

    def serviceMethod() {

    }

    def addVisit(User user, Item item) {
        //Metodo que acumula visitas de un usuario a un item

        if (checkVisitExists(user, item)) {
            //buscar y traer la visita
        } else {
            //throw
        }

    }

    boolean checkVisitExists(User user, Item item) {
        return Visit.findByUserAndItem(user, item) == null ? false : true
    }
}
