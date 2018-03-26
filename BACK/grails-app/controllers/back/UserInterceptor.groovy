package back


class UserInterceptor {

    public UserInterceptor(){
        match controller: 'user'
    }

    boolean before() {
        def user = session.username
        println "user interceptor"
        println "usuario en sesion: " + user
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
