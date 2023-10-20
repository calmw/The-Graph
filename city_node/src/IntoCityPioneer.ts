import {
    DailyRewardRecord as DailyRewardRecordEvent,
    SuretyRecord as SuretyRecordEvent,
    WithdrawalRewardRecord as WithdrawalRewardRecordEvent
} from "../generated/IntoCityPioneer/IntoCityPioneer"
import {DailyRewardRecord, SuretyRecord, WithdrawalRewardRecord} from "../generated/schema"
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";
import {timestampToDatetime} from "./utils/constants";


// 这里面可以写多个handler

export function handleSuretyRecordLog(event: SuretyRecordEvent): void {
    let suretyRecord = new SuretyRecord(createEventID(event.block.number, event.logIndex))
    suretyRecord.pioneerAddress = event.params.pioneerAddress
    suretyRecord.amount = event.params.amount
    suretyRecord.month = event.params.month
    suretyRecord.txHash = event.transaction.hash
    suretyRecord.ctime = timestampToDatetime(event.block.timestamp.toI64())
    suretyRecord.save()
}

export function handleDailyRewardRecordLog(event: DailyRewardRecordEvent): void {
    let dailyRewardRecord = new DailyRewardRecord(createEventID(event.block.number, event.logIndex))
    dailyRewardRecord.pioneerAddress = event.params.pioneerAddress
    dailyRewardRecord.toxReward = event.params.toxReward
    dailyRewardRecord.foundsReward = event.params.foundsReward
    dailyRewardRecord.delegateReward = event.params.delegateReward
    dailyRewardRecord.txHash = event.transaction.hash
    dailyRewardRecord.ctime =  timestampToDatetime(event.block.timestamp.toI64())
    dailyRewardRecord.save()
}

export function handleWithdrawalRewardRecordLog(event: WithdrawalRewardRecordEvent): void {
    let withdrawalRewardRecord = new WithdrawalRewardRecord(createEventID(event.block.number, event.logIndex))
    withdrawalRewardRecord.pioneerAddress = event.params.pioneerAddress
    withdrawalRewardRecord.reward = event.params.reward
    withdrawalRewardRecord.rewardType = event.params.rewardType
    withdrawalRewardRecord.txHash = event.transaction.hash
    withdrawalRewardRecord.ctime =  timestampToDatetime(event.block.timestamp.toI64())
    withdrawalRewardRecord.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}


