import { DeepLinkUri, IDeepLink } from '@src/deep-link'

export interface IParser {
    parse(uri: DeepLinkUri): IDeepLink
}
