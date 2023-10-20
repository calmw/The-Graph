import {
    RechargeRecord as RechargeRecordEvent
} from "../generated/IntoCity/IntoCity"
import {RechargeRecord} from "../generated/schema" // 这里的名字随graphQl文件中定义的Entity
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";
import {timestampToDatetime} from "./utils/constants";

// 这里面可以写多个handler

export function handleRechargeRecordLog(event: RechargeRecordEvent): void {
    let rechargeRecord = new RechargeRecord(createEventID(event.block.number, event.logIndex))
    rechargeRecord.user = event.params.user
    rechargeRecord.countyId = event.params.countyId
    rechargeRecord.amount = event.params.amount
    rechargeRecord.txHash = event.transaction.hash
    rechargeRecord.ctime = timestampToDatetime(event.block.timestamp.toI64())
    rechargeRecord.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}

