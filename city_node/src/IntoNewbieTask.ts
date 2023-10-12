import {ClaimRecord as ClaimRecordEvent} from "../generated/NewbieTask/NewbieTask"
import {ClaimRecord} from "../generated/schema"
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

// 这里面可以写多个handler

export function handleClaimRecordLog(event: ClaimRecordEvent): void {
    let claimRecord = new ClaimRecord(createEventID(event.block.number, event.logIndex))
    claimRecord.tid = event.params.tid
    claimRecord.user = event.params.user
    claimRecord.claimType = event.params.claimType
    claimRecord.amount = event.params.amount
    claimRecord.txHash = event.transaction.hash
    claimRecord.ctime = event.params.ctime
    claimRecord.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}

