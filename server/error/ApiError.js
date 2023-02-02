class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return ApiError(404, message)
    }
    static internal(message) {
        return ApiError(500, message)
    }
    static forbidden(message) {
        return ApiError(403, message)
    }
}
module.exports = ApiError