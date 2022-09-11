import { Request, Response } from "express";

import networkService from "../services/networkService";

export async function findAllNetworks(req: Request, res: Response) {
  const { user } = res.locals;
  const networks = await networkService.findAllNetworks(user.id);

  res.send(networks);
}

export async function findNetwork(req: Request, res: Response) {
  const { user } = res.locals;
  const networkId = parseInt(req.params.id);
  if(isNaN(networkId)) {
    res.sendStatus(422);
  }

  const network = await networkService.findNetwork(user.id, networkId)
  res.send(network);
}

export async function createNetwork(req: Request, res: Response) {
  const { user } = res.locals;
  const network = req.body;

  await networkService.createNetwork(user, network);
  res.sendStatus(201); 
}

export async function deleteNetwork(req: Request, res: Response) {
  const networkId = parseInt(req.params.id);
  if(isNaN(networkId)) {
    res.sendStatus(422);
  }

  const { user } = res.locals;
  await networkService.deleteNetwork(user, networkId);
  res.sendStatus(200);
}