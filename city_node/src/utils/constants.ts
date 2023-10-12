/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'


export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export function getDayID(timestamp: BigInt): i32 {
    let newTP = timestamp.toI32()
    let dayID = newTP / 86400
    return dayID
}

export function getDetaTimestamp(dayID: i32): i32{
    let dayStartTimestamp = dayID * 86400
    return dayStartTimestamp
}

export function getEndDay(dayID: i32, days: i32): i32{
    let dayStartTimestamp = getDetaTimestamp(dayID)
    
    let endTS = dayStartTimestamp + days*86400
    return endTS

    
}