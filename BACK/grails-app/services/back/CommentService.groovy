package back

import grails.gorm.transactions.Transactional

@Transactional
class CommentService {

    def serviceMethod() {

    }

    List<Comment> list(Map args) {
        return Comment.list(args)
    }


    def save(String username, String message){
        User user = User.findByUsername(username)
        Comment comment = new Comment(user: user, message: message, createDate: new Date())
        comment.validate()
        if(comment.hasErrors()){
            return comment
        }else{
            return comment.save()
        }
    }
}
