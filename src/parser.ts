import * as URL from 'url'

export function parseDeepLink(deepLinkString: string): unknown {
    return parser(deepLinkString)
}

function parser(deepLinkString: string): unknown {
    console.log('DEEP LINK: ', deepLinkString)

    const result = URL.parse(deepLinkString)
    console.log('PARSE RESULT: ', result)

    return result
}
