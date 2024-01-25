exports.sessionExtension = function sessionExtension(session) {
    session.expiresAt = Date.now() + 120 * 1000;
}


exports.Session = class Session {
    constructor(username, expiresAt) {
        this.username = username;
        this.expiresAt = expiresAt;
    }

    isExpired() {
        this.isExpired < (new Date());
    }
}
