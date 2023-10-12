import {SuretyRecord as SuretyRecordEvent} from "../generated/IntoCityPioneer/IntoCityPioneer"
import {SuretyRecord} from "../generated/schema" // 这里的名字随graphQl文件中定义的Entity
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

// 这里面可以写多个handler

export function handleSuretyRecordLog(event: SuretyRecordEvent): void {
    let suretyRecord = new SuretyRecord(createEventID(event.block.number, event.logIndex))
    suretyRecord.pioneerAddress = event.params.pioneerAddress
    suretyRecord.amount = event.params.amount
    suretyRecord.month = event.params.month
    suretyRecord.txHash = event.transaction.hash
    suretyRecord.ctime = event.block.timestamp
    suretyRecord.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}

