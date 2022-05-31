export class InvalidDeepLinkProtocolError extends Error {
    constructor(reason = '') {
        super(`Invalid deep link protocol${reason ? ': ' + reason : ''}`)
    }
}
