import qs from 'qs'

export function parseDeepLink(deepLinkString: string): unknown {
    return parser(deepLinkString)
}

function parser(deepLinkString: string): unknown {
    console.log('DEEP LINK: ', deepLinkString)

    const queryParameters = deepLinkString.split('?')
    const queryParametersString = queryParameters.length > 0 ? queryParameters[1] : ''

    const queryParameterObject = qs.parse(queryParametersString)
    console.log('QUERY PARAMS PARSE RESULT: ', queryParameterObject)

    return undefined
}

const DEEP_LINK =
    'iota://wallet/send/atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5?amount=80&unit=Gi'

parseDeepLink(DEEP_LINK)
