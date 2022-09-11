import connection from "../config/database";
import { TCreateUserData } from "../utils/typeUtils";


export async function findUserEmail(email: string) {
  return connection.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findById(id: number) {
  return connection.user.findUnique({
    where: { id }
  });
}

export async function insert(user: TCreateUserData) {
  return connection.user.create({
    data: user,
  });
}
