
import connection from "../config/database";
import { TCreateCreditCardData } from "../utils/typeUtils";



export async function purchaseAllCards(userId: number) {
  return connection.creditCard.findMany({
    where: { userId }
  })
}

export async function purchaseCard(userId: number, cardId: number) {
  return connection.creditCard.findFirst({
    where: {
      userId,
      id: cardId
    }
  })
}

export async function purchaseCardByTitle(userId: number, title: string) {
  return connection.creditCard.findFirst({
    where: { userId, title }
  })
}

export async function insertCard(userId: number, card: TCreateCreditCardData) {
  return connection.creditCard.create({
    data: {...card, userId }
  })
}

export async function deleteCard(id: number) {
  return connection.creditCard.delete({ where: { id } });
}