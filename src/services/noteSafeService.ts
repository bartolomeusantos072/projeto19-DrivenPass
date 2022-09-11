import { User } from "@prisma/client";
import { conflictError, notFoundError } from "../utils/errorUtils";
import { TCreateNoteSafe } from "../utils/typeUtils";
import * as noteSafeRepository from "../repositories/noteSafeRepository";

async function findAllNoteSafes(userId: number) {
  const noteSafes = await noteSafeRepository.findAllNoteSafes(userId);
  return noteSafes;
}

async function findNoteSafe(userId: number, noteSafeId: number) {
  const noteSafe = await noteSafeRepository.findNoteSafe(userId, noteSafeId);
  if(!noteSafe) throw notFoundError("Safe note doesn't exist");

  return noteSafe;
}

async function createNoteSafe(user: User, noteSafe: TCreateNoteSafe) {

  const existingCredential = await noteSafeRepository.findNoteSafeByTitle(user.id, noteSafe.title);
  if(existingCredential) throw conflictError("Title already in use");

  await noteSafeRepository.insertNoteSafe(user.id, noteSafe);
}

async function deleteNoteSafe(user: User, noteSafeId: number) {
  await findNoteSafe(user.id, noteSafeId);
  await noteSafeRepository.deleteNoteSafe(noteSafeId);
}

const noteSafeService = {
  findNoteSafe,
  findAllNoteSafes,
  createNoteSafe,
  deleteNoteSafe
}

export default noteSafeService;