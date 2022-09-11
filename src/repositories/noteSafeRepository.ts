import connection from "../config/database";
import { TCreateNoteSafe } from "../utils/typeUtils";

export async function insertNoteSafe(userId: number, noteSafe: TCreateNoteSafe) {
  return connection.noteSafe.create({
    data: {...noteSafe, userId }
  })
}

export async function deleteNoteSafe(id: number) {
  return connection.noteSafe.delete({
    where: { id }
  })
}

export async function findAllNoteSafes(userId: number) {
  return connection.noteSafe.findMany({
    where: { userId }
  })
}

export async function findNoteSafe(userId: number, noteSafeId: number) {
  return connection.noteSafe.findFirst({
    where: {
      userId,
      id: noteSafeId
    }
  })
}

export async function findNoteSafeByTitle(userId: number, title: string) {
  return connection.noteSafe.findFirst({
    where: { userId, title }
  })
}

