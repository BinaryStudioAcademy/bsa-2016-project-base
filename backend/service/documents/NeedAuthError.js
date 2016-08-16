module.exports = class NeedAuthError extends Error{
    constructor() {
        super("No token. Please visit http://localhost:3000/api/documents/authentication");
        this.type = "NEED_AUTH";
    }
};