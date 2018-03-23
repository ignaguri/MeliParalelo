
package back

class BootStrap {

    def init = { servletContext ->

        if(Category.findAll().isEmpty())
            PopulateDB.populate()

        User user = new User("admin",
                             "admin",
                             "Administrador",
                             "Paralelo",
                             "aparalelo@mercadolibre.com",
                             "22/03/2018",
                             0)

        user.save();
     }
    def destroy = {
    }
}
