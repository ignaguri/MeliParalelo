package back

import grails.converters.JSON
import org.springframework.http.HttpStatus

class CommentController {

    CommentService commentService

    def index() {
        try {
            response.status = HttpStatus.OK.value()
            respond commentService.list(params)
        } catch (Exception e) {
            response.status = HttpStatus.INTERNAL_SERVER_ERROR.value()
            render([error: e.message] as JSON)
        }
    }

    def save() {
        String username = request.JSON.username
        String message = request.JSON.message

        def hasErrors = false
        if (!username || !message) {
            hasErrors = true
        }

        def responseData
        if (hasErrors) {
            response.status = HttpStatus.BAD_REQUEST.value()
            responseData = [
                    "error": g.message(code: 'default.blank.parameters')
            ]
        } else {
            Comment comment = commentService.save(username, message)
            if (!comment.hasErrors()) {
                response.status = HttpStatus.OK.value()
                responseData = [
                        "comment": comment
                ]
            } else {
                response.status = HttpStatus.BAD_REQUEST.value()
                responseData = [
                        "error": g.message(code: 'default.blank.parameters')
                ]
            }
        }
        withFormat {
            json {
                render responseData as JSON
            }
        }ç
    }

}
