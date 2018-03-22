import back.Item
import back.Category
import back.Picture
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
            def urlI = 'https://api.mercadolibre.com/sites/MLA/search?category=' + categoryId + '&limit=1'
            def itemsList = getRequest(urlI)

            def auxCategory = new Category('categoryId': it.id, 'name': it.name).save()

            itemsList.results.each {

                def urlP = 'https://api.mercadolibre.com/items/' + it.id
                def itemsList2 = getRequest(urlP)

                def token = '$4d35cfa3df04fd66892659d65edb27f3-2609a553b4e8d3daf99e27136d48eb61-ce1c80f54ce4aff9d2dbe0aa87dc1e1f'
                def urlD = 'https://api.mercadolibre.com/items/' + it.id + '/description?access_token=' + token
                def description = getRequest(urlD).plain_text


                def pictureList = []

                itemsList2.pictures.each {
                    pictureList.push(new Picture(url: it.url))
                }



                def auxItem = new Item(
                        siteId: it.id,
                        title: it.title,
                        price: it.price,
                        originalPrice: it.original_price,
                        initialQuantity: itemsList2.initial_quantity,
                        availableQuantity: it.available_quantity,
                        soldQuantity: it.sold_quantity,
                        conditionItem: it.condition,
                        thumbnail:  it.thumbnail,
                        categoryId:  auxCategory.categoryId,
                        stateName: it.address.state_name,
                        acceptsMP: it.accepts_mercadopago,
                        qualification: Math.abs(new Random().nextInt() % 5) + 3,
                        description: description
                )

                pictureList.each {
                    auxItem.addTo('pictures', it)
                }

                auxItem.save()

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
