export class InvalidDeepLinkContextError extends Error {
    constructor(reason = '') {
        super(`Invalid deep link context${reason ? ': ' + reason : ''}`)
    }
}
