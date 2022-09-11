import connection from "../config/database";
import { TCreateCredentialData } from "../utils/typeUtils";

export async function findAll(userId: number) {
  return connection.credential.findMany({
    where: { userId }
  })
}

export async function findCredential(userId: number, credencialId: number) {
  return connection.credential.findFirst({
    where: {
      userId,
      id: credencialId
    }
  })
}

export async function findCredentialByTitle(userId: number, title: string) {
  return connection.credential.findFirst({
    where: { userId, title }
  })
}

export async function insertCredential(userId: number, credential: TCreateCredentialData) {
  return connection.credential.create({
    data: {...credential, userId }
  })
}

export async function deleteCredential(id: number) {
  return connection.credential.delete({ where: { id } });
}