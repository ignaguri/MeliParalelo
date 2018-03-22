import back.Item
import back.Category
import groovy.json.JsonSlurper



class PopulateDB {

    static void main(String[] args) {
        populate()
    }

    static def populate() {
        def urlC = 'https://api.mercadolibre.com/sites/MLA/categories'
        def categoriesList = getRequest(urlC)

        categoriesList.each {
            def categoryId = it.id
            def urlI = 'https://api.mercadolibre.com/sites/MLA/search?category=' + categoryId + '&limit=20'
            def itemsList = getRequest(urlI)

            def auxCategory = new Category('categoryId': it.id, 'name': it.name).save()

            itemsList.results.each {

                def urlP = 'https://api.mercadolibre.com/items/' + it.id
                def picturesList = getRequest(urlP)
                def picture_url = picturesList.pictures[0].url

                def auxItem = new Item(
                        siteId: it.id,
                        title: it.title,
                        price: it.price,
                        availableQuantity: it.available_quantity,
                        conditionItem: it.condition,
                        thumbnail:  it.thumbnail,
                        categoryId:  auxCategory.categoryId,
                        pictureUrl:  picture_url,
                        stateName: it.address.state_name
                ).save()

                println(auxItem)
            }
        }
    }

    static def getRequest(url) {
        def urlConn = new URL(url)
        def connection = (HttpURLConnection)urlConn.openConnection()
        connection.setRequestMethod("GET")
        connection.setRequestProperty("Accept", "application/json")
        JsonSlurper json = new JsonSlurper()
        return  json.parse(connection.getInputStream())
    }
}
