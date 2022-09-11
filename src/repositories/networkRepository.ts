import connection from "../config/database";
import { TCreateNetworkData } from "../utils/typeUtils";



export async function findAll(userId: number) {
  return connection.netWork.findMany({
    where: { userId }
  })
}

export async function findNetwork(userId: number, networkId: number) {
  return connection.netWork.findFirst({
    where: {
      userId,
      id: networkId
    }
  })
}

export async function insertNetwork(userId: number, network: TCreateNetworkData) {
  return connection.netWork.create({
    data: {...network, userId }
  })
}

export async function deleteNetwork(id: number) {
  return connection.netWork.delete({
    where: { id }
  })
}