import { DeepLinkContext, DeepLinkProtocol } from '../enums'
import { DeepLinkArgument, DeepLinkOperation, DeepLinkParameters } from '../types'

export interface IDeepLink {
    protocol?: DeepLinkProtocol
    context?: DeepLinkContext
    operation?: DeepLinkOperation
    argument?: DeepLinkArgument
    parameters?: DeepLinkParameters
}
