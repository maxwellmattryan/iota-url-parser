import { IDeepLink } from '@src/deep-link'
import { parse } from '@src/parse'
import { IotaUnit } from '@src/utils'

const TEST_PROTOCOL = 'iota'
const TEST_CONTEXT = 'wallet'
const TEST_OPERATION = 'send'
const TEST_ARGUMENT = 'atoi1qzallu8y7jhglsc6n93qx8u3lfv3nwagju7xh7al2y7rwwt7f4vsuda9rg5'
const TEST_QUERY_PARAMS = 'amount=62&unit=Gi'

const TEST_DEEP_LINK = `${TEST_PROTOCOL}://${TEST_CONTEXT}/${TEST_OPERATION}/${TEST_ARGUMENT}?${TEST_QUERY_PARAMS}`

describe('Function: parse', () => {
    it('should handle valid deep links', () => {
        expect(parse(TEST_DEEP_LINK)).toEqual(<IDeepLink>{
            protocol: TEST_PROTOCOL,
            context: TEST_CONTEXT,
            operation: TEST_OPERATION,
            argument: TEST_ARGUMENT,
            parameters: {
                amount: 62,
                unit: IotaUnit.Gi,
            },
        })
    })
})
