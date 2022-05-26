import { DeepLinkUri, IDeepLink } from '@src/deep-link'
import { Parser } from '@src/parsers'

export function parse(uri: DeepLinkUri): IDeepLink {
    return new Parser().parse(uri)
}
