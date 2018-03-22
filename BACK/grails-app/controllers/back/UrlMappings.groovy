package back

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/categories" (resources: "category")
        "/items" (resources: "item")
        "/items/preferences" (resources: "item", controller: "item", action: "preferences")

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
