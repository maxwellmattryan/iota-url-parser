import qs from 'qs'

import {
    DeepLinkArgument,
    DeepLinkContext,
    DeepLinkOperation,
    DeepLinkParameters,
    DeepLinkProtocol,
    DeepLinkUri,
    WalletOperation,
} from '@src/deep-link'

export function build(
    protocol: DeepLinkProtocol | string = DeepLinkProtocol.IOTA,
    context: DeepLinkContext | string = DeepLinkContext.Wallet,
    operation: DeepLinkOperation | string = WalletOperation.Send,
    argument: DeepLinkArgument,
    parameters?: DeepLinkParameters
): DeepLinkUri {
    const parametersString = qs.stringify(parameters)

    return `${protocol}://${context}/${operation}/${argument}?${parametersString}`
}
