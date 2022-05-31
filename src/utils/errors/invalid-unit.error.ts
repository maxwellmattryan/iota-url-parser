export class InvalidUnitError extends Error {
    constructor(reason = '') {
        super(`Invalid unit${reason ? ': ' + reason : ''}`)
    }
}
