import {Delegate as DelegateEvent} from "../generated/IntoTest/IntoTest"
import {Delegate} from "../generated/schema" // 这里的名字随graphQl文件中定义的Entity
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

// 这里面可以写多个handler

export function handleDelegateLog(event: DelegateEvent): void {
    let delegate = new Delegate(createEventID(event.block.number, event.logIndex))
    delegate.amount = event.params.amount
    delegate.txHash = event.transaction.hash
    delegate.ctime = event.block.timestamp
    delegate.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}

