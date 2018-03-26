package back

import grails.testing.web.interceptor.InterceptorUnitTest
import spock.lang.Specification

class UserInterceptorSpec extends Specification implements InterceptorUnitTest<UserInterceptor> {

    def setup() {
    }

    def cleanup() {

    }

    void "Test credentials interceptor matching"() {
        when:"A request matches the interceptor"
            withRequest(controller:"credentials")

        then:"The interceptor does match"
            interceptor.doesMatch()
    }
}
