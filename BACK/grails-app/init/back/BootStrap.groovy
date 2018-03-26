
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

        user.save()

        User user2 = new User("martin",
                "martin",
                "Martin",
                "Paralelo",
                "mparalelo@mercadolibre.com",
                "22/03/2018",
                0)

        user2.save();
     }
    def destroy = {
    }
}
