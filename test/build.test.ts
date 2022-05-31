import qs from 'qs'

import { build } from '@src/build'
import {
    DeepLinkArgument,
    DeepLinkContext,
    DeepLinkOperation,
    DeepLinkParameters,
    DeepLinkProtocol,
    WalletOperation,
} from '@src/deep-link'
import { IotaUnit } from '@src/utils'

const TEST_PROTOCOL: DeepLinkProtocol = DeepLinkProtocol.IOTA
const TEST_PROTOCOL_STR = 'iota'
const TEST_CONTEXT: DeepLinkContext = DeepLinkContext.Wallet
const TEST_CONTEXT_STR = 'wallet'
const TEST_OPERATION: DeepLinkOperation = WalletOperation.Send
const TEST_OPERATION_STR = 'send'
const TEST_ARGUMENT: DeepLinkArgument = 'atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5'
const TEST_QUERY_PARAMS: DeepLinkParameters = { amount: 51, unit: IotaUnit.Gi }

const TEST_DEEP_LINK = `${TEST_PROTOCOL}://${TEST_CONTEXT}/${TEST_OPERATION}/${TEST_ARGUMENT}?${qs.stringify(
    TEST_QUERY_PARAMS
)}`

describe('Function: build', () => {
    it('should build valid deep links with proper types', () => {
        expect(build(TEST_PROTOCOL, TEST_CONTEXT, TEST_OPERATION, TEST_ARGUMENT, TEST_QUERY_PARAMS)).toEqual(
            TEST_DEEP_LINK
        )
    })
    it('should build valid deep links with just strings', () => {
        expect(
            build(TEST_PROTOCOL_STR, TEST_CONTEXT_STR, TEST_OPERATION_STR, TEST_ARGUMENT, TEST_QUERY_PARAMS)
        ).toEqual(TEST_DEEP_LINK)
    })
})
