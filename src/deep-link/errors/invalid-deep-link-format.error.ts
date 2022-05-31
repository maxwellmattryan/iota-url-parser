export class InvalidDeepLinkFormatError extends Error {
    constructor(reason: string) {
        super(`Invalid deep link format: ${reason}`)
    }
}
