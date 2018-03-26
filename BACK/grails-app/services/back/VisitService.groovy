package back

import grails.gorm.transactions.Transactional
import grails.web.servlet.mvc.GrailsParameterMap

@Transactional
class VisitService {

    def serviceMethod() {

    }

    List<Visit> list(Map args) {
        return Visit.list(args)
    }

    def addVisit(User user, Item item) {
        //Metodo que acumula visitas de un usuario a un item

        if (checkVisitExists(user, item)) {
            //buscar la visita
            Visit visit = Visit.findByUserAndItem(user, item)

            visit.count ++

            visit.save()

        } else {
            //Crear visita
            Visit visit = new Visit(user, item)

            visit.save()
        }

    }

    boolean checkVisitExists(User user, Item item) {
        return Visit.findByUserAndItem(user, item) == null ? false : true
    }
}
