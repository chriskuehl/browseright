package stocksim.api.category

import stocksim.api.*
import stocksim.*

class UserInterfaceService {
    def userService
    
    public def _info = { response, action, params, user ->
        response.displayName = user.displayName
        response.email = user.email
        response.classCode = user.classroom.classCode
        
        response.balance = [
            raw: user.balance,
            pretty: user.getPrettyBalance()
        ]
        
        response.assets = [
            raw: user.getPortfolioValue(),
            pretty: user.getPrettyPortfolioValue()
        ]
        
        response.totalAssets = [
            raw: user.getTotalAssets(),
            pretty: user.getPrettyTotalAssets()
        ]
    }
    
    public def _classroom = { response, action, params, user ->
        def classroom = user.classroom
        def teacher = classroom.teacher
        
        response.teacher = [
            email: teacher.email,
            displayName: teacher.displayName
        ]
        
        response.classCode = classroom.classCode
        
        def unsortedMembers = []
        
        user.getClassmates().each { classmate ->
            unsortedMembers.add([
                displayName: classmate.displayName,
                email: classmate.email,

                balance: [
                    raw: classmate.getBalance(),
                    pretty: classmate.getPrettyBalance()
                ],

                portfolioValue: [
                    raw: classmate.getPortfolioValue(),
                    pretty: classmate.getPrettyPortfolioValue()
                ],

                totalAssets: [
                    raw: classmate.getTotalAssets(),
                    pretty: classmate.getPrettyTotalAssets()
                ]
            ])
        }
        
        def sortedMembers = unsortedMembers.sort { a, b ->
            if (a.totalAssets.raw == b.totalAssets.raw) {
                return 0
            } else if (a.totalAssets.raw < b.totalAssets.raw) {
                return 1
            } else {
                return (- 1)
            }
        }
        
        response.members = sortedMembers
    }
    
    // TODO: eventually this is a security hole that should be fixed
    // (it is possible to see if an email is registered here since requests take longer
    //  when we have to compute the password hash, which is only when an account is registered)
    // 
    // ...but in reality this is not that big of a deal, especially since you can tell
    // if an email is registered simply by trying to register as that email
    public def login = { response, action, params, alreadyAuthedUser ->
        def email = params.email
        def password = params.password
        
        response.apiCode = AppInterface.codes.BAD_LOGIN_INFO
        
        if (email != null) {
            def user = User.findByEmail(email)
            
            if (user != null) {
                if (user.passwordHash == null) {
                    // we need to send them a password set email (since this
                    // is a beta-testing user)
                    response.apiCode = AppInterface.codes.SET_PASSWORD_FIRST
                    user.sendResetPasswordEmail()
                } else if (password != null && user.passwordMatches(password)) {
                    response.apiCode = AppInterface.codes.OK
                    userService.becomeAPI(response, user)
                }
            }
        }
    }
}
