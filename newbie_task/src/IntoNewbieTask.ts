import {ClaimLog as ClaimLogEvent} from "../generated/NewbieTask/NewbieTask"
import {ClaimLog} from "../generated/schema"
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

// 这里面可以写多个handler

export function handleClaimLog(event: ClaimLogEvent): void {
    let claimRecord = new ClaimLog(createEventID(event.block.number, event.logIndex))
    claimRecord.user = event.params.user
    claimRecord.claimType = event.params.claimType
    claimRecord.amount = event.params.amount
    claimRecord.txHash = event.transaction.hash
    claimRecord.ctime = event.block.timestamp
    claimRecord.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}

