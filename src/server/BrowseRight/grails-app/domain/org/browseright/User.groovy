package org.browseright

abstract class User {
    static constraints = {

    }

    // basic user properties
    String firstName
    String lastName
    String email
    String passwordHash
    Date lastPasswordChangeTime
    List<UserSession> sessions

    // registration
    String registerIP
    String registerUserAgent
    Date registerTime

    // last seen
    String lastSeenIP
    String lastSeenUserAgent
    Date lastSeenTime

    // BR-specific stuff
    School school
}