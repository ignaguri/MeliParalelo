
package back

class BootStrap {

    def init = { servletContext ->

        if(Category.findAll().isEmpty())
            PopulateDB.populate()

     }
    def destroy = {
    }
}
