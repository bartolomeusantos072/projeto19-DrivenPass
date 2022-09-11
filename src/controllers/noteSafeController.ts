import { NoteSafe } from "@prisma/client";
import { Request, Response } from "express";
import noteSafeService from "../services/noteSafeService";

export async function findAllNoteSafes(req: Request, res: Response) {
  const { user } = res.locals;
  const noteSafes = await noteSafeService.findAllNoteSafes(user.id);

  res.send(noteSafes);
}

export async function findNoteSafe(req: Request, res: Response) {
  const { user } = res.locals;
  const noteSafeId = parseInt(req.params.id);
  if(isNaN(noteSafeId)) {
    res.sendStatus(422); 
  }

  const noteSafe = await noteSafeService.findNoteSafe(user.id, noteSafeId);
  res.send(noteSafe);
}

export async function createNoteSafe(req: Request, res: Response) {
  const {user} = res.locals;
  const credential = req.body;

  await noteSafeService.createNoteSafe(user, credential);
  res.sendStatus(201); 
}

export async function deleteNoteSafe(req: Request, res: Response) {
  const noteSafeId = parseInt(req.params.id);
  if(isNaN(noteSafeId)) {
    res.sendStatus(422); 
  }
  const { user } = res.locals;
  await noteSafeService.deleteNoteSafe(user, noteSafeId);
  res.sendStatus(200);
}
