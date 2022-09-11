import { Credential } from "@prisma/client";
import { Request, Response } from "express";
import credentialService from "../services/credentialService";

export async function findAllCredentials(req: Request, res: Response) {
  const { user } = res.locals;
  const credencials: Credential[] = await credentialService.findAllCredentials(user.id);

  res.send(credencials);
}

export async function findCredential(req: Request, res: Response) {
  const { user } = res.locals;
  const credentialId = parseInt(req.params.id);
  if(isNaN(credentialId)) {
    res.sendStatus(422); 
  }

  const credential = await credentialService.findCredential(user.id, credentialId);
  res.send(credential);
}

export async function createCredential(req: Request, res: Response) {
  const {user} = res.locals;
  const credential = req.body;

  await credentialService.createCredential(user, credential);
  res.sendStatus(201); // created
}

export async function deleteCredential(req: Request, res: Response) {
  const credentialId = parseInt(req.params.id);
  if(isNaN(credentialId)) {
    res.sendStatus(422); // unprocessable entity
  }

  const { user } = res.locals;
  await credentialService.deleteCredential(user, credentialId);
  res.sendStatus(200);
}
