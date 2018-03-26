
package back

class BootStrap {

    def init = { servletContext ->

        if(Category.findAll().isEmpty())
            PopulateDB.populate()

        new Role('user').save()
        new Role('admin').save()

        User user = new User("admin",
                             "admin",
                             "Administrador",
                             "Paralelo",
                             "aparalelo@mercadolibre.com",
                             "22/03/2018",
                             0,
                             Role.findByName('admin')
        )

        user.save()

        User user2 = new User("martin",
                "martin",
                "Martin",
                "Paralelo",
                "mparalelo@mercadolibre.com",
                "22/03/2018",
                0,
                Role.findByName('user'))

        user2.save();
     }
    def destroy = {
    }
}
