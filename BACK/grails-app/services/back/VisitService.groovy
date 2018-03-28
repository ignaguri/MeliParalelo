package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import grails.web.servlet.mvc.GrailsParameterMap
import groovy.sql.Sql
import org.springframework.http.HttpStatus

@Transactional
class VisitService {

    def dataSource

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

    List<Object> queryVisitsAndPurchases() {

        def sql = new Sql(dataSource)

        def list = []

        def temp = sql.rows("SELECT t.Item as 'Item', SUM(t.Visitas) as 'Visits', SUM(t.Compras) as 'Purchases' FROM (SELECT itm.item_id as 'Item', SUM(chd.quantity) as 'Compras', 0 as 'Visitas' FROM checkout chk, checkout_detail chd, item itm WHERE chd.checkout_id = chk.id AND chd.item_id = itm.id GROUP BY itm.item_id UNION ALL SELECT itm.item_id as 'Item', 0 as 'Compras', vst.count as 'Visitas' FROM visit vst, item itm WHERE vst.item_id = itm.id) as t GROUP BY t.Item;")

        temp.each {
            list.push(JSON.parse(it.toString()))
        }

        return list
    }

    boolean checkVisitExists(User user, Item item) {
        return Visit.findByUserAndItem(user, item) == null ? false : true
    }
}
