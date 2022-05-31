export class InvalidDeepLinkParametersError extends Error {
    constructor(reason = '') {
        super(`Invalid deep link parameter(s)${reason ? ': ' + reason : ''}`)
    }
}
