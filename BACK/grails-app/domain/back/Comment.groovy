package back

class Comment {

    String message
    Date createDate

    static belongsTo = [user : User]

    static constraints = {
        message blank: false, nullable: false, size: 1..255
        createDate min: new Date()
    }
}
