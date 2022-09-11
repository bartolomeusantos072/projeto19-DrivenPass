import { User } from "@prisma/client";

import * as networkRepository from "../repositories/networkRepository";
import { decrypt, encrypt } from "../utils/criptrUtils";
import { notFoundError } from "../utils/errorUtils";
import { TCreateNetworkData } from "../utils/typeUtils";


async function findAllNetworks(userId: number) {
  const networks = await networkRepository.findAll(userId);
  return networks.map(network => {
    return {...network, password: decrypt(network.password) }
  });
}

async function findNetwork(userId: number, networkId: number) {
  const network = await networkRepository.findNetwork(userId, networkId);
  if(!network) throw notFoundError("Network doesn't exist");

  return {
    ...network,
    password: decrypt(network.password)
  }
}

async function createNetwork(user: User, network: TCreateNetworkData) {
  const networkInfos = {...network, password: encrypt(network.password)};
  await networkRepository.insertNetwork(user.id, networkInfos);
}

async function deleteNetwork(user: User, networkId: number) {
  await findNetwork(user.id, networkId);
  await networkRepository.deleteNetwork(networkId);
}

const networkService = {
  findNetwork,
  findAllNetworks,
  createNetwork,
  deleteNetwork
}

export default networkService;