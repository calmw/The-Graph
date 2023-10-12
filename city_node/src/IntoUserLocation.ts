import {UserLocationRecord as UserLocationRecordEvent} from "../generated/IntoUserLocation/UserLocation"
import {UserLocationRecord} from "../generated/schema" // 这里的名字随graphQl文件中定义的Entity
import {Address, BigInt, Bytes} from "@graphprotocol/graph-ts";

// 这里面可以写多个handler

export function handleUserLocationRecordLog(event: UserLocationRecordEvent): void {
    let userLocationLog = new UserLocationRecord(createEventID(event.block.number, event.logIndex))
    userLocationLog.user = event.params.user
    userLocationLog.cityId = event.params.cityId
    userLocationLog.location = event.params.location
    userLocationLog.txHash = event.transaction.hash
    userLocationLog.ctime = event.block.timestamp
    userLocationLog.save()
}


function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}

function createResolverID(node: Bytes, resolver: Address): string {
    return resolver.toHexString().concat('-').concat(node.toHexString())
}

