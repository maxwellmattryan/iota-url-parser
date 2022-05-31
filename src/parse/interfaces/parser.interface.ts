import { DeepLinkUri, IDeepLink } from '../../deep-link'

export interface IParser {
    parse(uri: DeepLinkUri): IDeepLink
}
