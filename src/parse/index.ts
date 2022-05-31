import * as qs from 'qs'

import {
    DeepLinkArgument,
    DeepLinkContext,
    DeepLinkOperation,
    DeepLinkParameters,
    DeepLinkProtocol,
    DeepLinkUri,
    IDeepLink,
    InvalidDeepLinkFormatError,
    ISendOperationParameters,
    SendOperationParameter,
    WalletOperation,
    WalletOperationParameters,
} from '@src/deep-link'
import { InvalidUnitError, IotaUnit } from '@src/utils'

export function parse(uri: DeepLinkUri): IDeepLink {
    try {
        console.log('DEEP LINK URI: ', uri)

        const regexp = /(^iota|smr):\/\/([a-z]*)\/([a-z]*)\/([a-z0-9]*)/g
        const regexpResult = regexp.exec(uri) ?? []
        if (!regexpResult || regexpResult.length < 5) {
            throw new InvalidDeepLinkFormatError('URI is not fully formed')
        }

        const protocolRaw = regexpResult[1]
        const protocol = validateProtocol(protocolRaw)

        const contextRaw = regexpResult[2]
        const context = validateContext(contextRaw)

        const operationRaw = regexpResult[3]
        const operation = validateOperation(context, operationRaw)

        const argumentRaw = regexpResult[4]
        const argument = validateArgument(context, operation, argumentRaw)

        const parametersRaw = uri.replace(`${protocolRaw}://${contextRaw}/${operationRaw}/${argumentRaw}?`, '')
        const parametersCasted = new Object(qs.parse(parametersRaw))
        const parameters = validateParameters(context, operation, parametersCasted)

        return <IDeepLink>{
            protocol,
            context,
            operation,
            argument,
            parameters: { ...parameters },
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

function validateProtocol(rawProtocol: string): DeepLinkProtocol {
    const isValidProtocol = Object.values(DeepLinkProtocol).includes(rawProtocol as DeepLinkProtocol)
    if (!isValidProtocol) {
        throw new InvalidDeepLinkFormatError('given protocol is not supported')
    }

    return rawProtocol as DeepLinkProtocol
}

function validateContext(rawContext: string): DeepLinkContext {
    const isValidContext = Object.values(DeepLinkContext).includes(rawContext as DeepLinkContext)
    if (!isValidContext) {
        throw new InvalidDeepLinkFormatError('given context is not supported')
    }

    return rawContext as DeepLinkContext
}

function validateOperation(context: DeepLinkContext, rawOperation: string): DeepLinkOperation {
    switch (context) {
        case DeepLinkContext.Wallet:
            return validateWalletOperation(rawOperation)
        default:
            return rawOperation as DeepLinkOperation
    }
}

function validateWalletOperation(rawOperation: string): WalletOperation {
    const isValidWalletOperation = Object.values(WalletOperation).includes(rawOperation as WalletOperation)
    if (!isValidWalletOperation) {
        throw new InvalidDeepLinkFormatError('given operation is not supported')
    }

    return rawOperation as WalletOperation
}

function validateArgument(
    context: DeepLinkContext,
    operation: DeepLinkOperation,
    rawArgument: string
): DeepLinkArgument {
    switch (context) {
        case DeepLinkContext.Wallet:
            return validateWalletOperationArgument(operation, rawArgument)
        default:
            throw new InvalidDeepLinkFormatError('given argument is not supported')
    }
}

function validateWalletOperationArgument(operation: WalletOperation, rawArgument: string): DeepLinkArgument {
    switch (operation) {
        case WalletOperation.Send:
            return validateBech32Address(rawArgument)
        default:
            throw new InvalidDeepLinkFormatError('given wallet operation argument was invalid')
    }
}

function validateBech32Address(address: string): string {
    return address
}

function validateParameters(
    context: DeepLinkContext,
    operation: DeepLinkOperation,
    rawParameters: object
): DeepLinkParameters {
    switch (context) {
        case DeepLinkContext.Wallet:
            return validateWalletOperationParameters(operation, rawParameters)
        default:
            throw new InvalidDeepLinkFormatError('given parameters were invalid')
    }
}

function validateWalletOperationParameters(
    operation: WalletOperation,
    rawParameters: object
): WalletOperationParameters {
    switch (operation) {
        case WalletOperation.Send:
            return validateSendOperationParameters(rawParameters as ISendOperationParameters)
        default:
            throw new InvalidDeepLinkFormatError('given wallet operation parameters were invalid')
    }
}

function validateSendOperationParameters(rawParameters: ISendOperationParameters): ISendOperationParameters {
    const parameters = <WalletOperationParameters>{}
    for (const param of Object.keys(rawParameters)) {
        switch (param) {
            case SendOperationParameter.Amount:
                parameters.amount = validateAmount(String(rawParameters[param]))
                break
            case SendOperationParameter.Unit:
                parameters.unit = validateIotaUnit(String(rawParameters[param]))
                break
            default:
                throw new InvalidDeepLinkFormatError('given send operation parameter is invalid')
        }
    }

    return parameters
}

function validateAmount(rawAmount: string): number {
    return parseFloat(rawAmount) ?? 0
}

function validateIotaUnit(rawIotaUnit: string): IotaUnit {
    const isValidIotaUnit = Object.values(IotaUnit).includes(rawIotaUnit as IotaUnit)
    if (!isValidIotaUnit) {
        throw new InvalidUnitError()
    }

    return rawIotaUnit as IotaUnit
}
