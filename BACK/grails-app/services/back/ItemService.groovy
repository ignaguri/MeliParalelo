package back

import grails.gorm.transactions.Transactional
import org.hibernate.QueryException
import org.hibernate.hql.internal.ast.QuerySyntaxException

@Transactional
class ItemService {

    def serviceMethod() {

    }

    List<Item> list(Map args) {
        return Item.list(args)
    }

    def filterItems(Map filters) {
        def item = []

        try {
            def sql = "FROM Item WHERE 1 = 1 AND "
            def i = 0
            filters.each {
                sql += (i != 0 && it.value[1] != null)? " AND " : ""
                sql += it.value[1] != null? it.value[0] + it.value[2] + "'" +it.value[1] +"'" : ""
                i ++
            }
            item = Item.findAll(sql)
        } catch(QuerySyntaxException e) {
            println e
        } catch(QueryException e ) {
            println e
        } catch(Exception e) {
            println e
        }

        return item
    }
}
