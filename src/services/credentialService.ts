import { User, Credential } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository";
import { decrypt, encrypt } from "../utils/criptrUtils";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils";
import { TCreateCredentialData } from "../utils/typeUtils";



async function findAllCredentials(userId: number) {
  const credentials = await credentialRepository.findAll(userId);
  return credentials.map(credential => {
    const { password } = credential;
    return {...credential, password: decrypt(password)}
  })
}

async function findCredential(userId: number, credentialId: number) {
  const credential = await credentialRepository.findCredential(userId, credentialId);
  if(!credential) throw notFoundError("Credential doesn't exist")

  return {
    ...credential,
    password: decrypt(credential.password)
  }
}

async function createCredential(user: User, credential: TCreateCredentialData) {
  
  const existingCredential = await credentialRepository.findCredentialByTitle(user.id, credential.title);
  if(existingCredential) throw conflictError("Title already in use");

  const credencialPassword = credential.password;
  const credentialInfos = {...credential, password: encrypt(credencialPassword)}

  await credentialRepository.insertCredential(user.id, credentialInfos);
}

async function deleteCredential(user: User, credentialId: number) {
  await findCredential(user.id, credentialId);
  await credentialRepository.deleteCredential(credentialId);
}

const credentialService = {
  findCredential,
  findAllCredentials,
  createCredential,
  deleteCredential
}

export default credentialService;