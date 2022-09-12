import { User } from "@prisma/client";
import * as cardRepository from "../repositories/cardRepository";
import { TCreateCreditCardData } from "../utils/typeUtils";
import { conflictError, notFoundError } from "../utils/errorUtils";
import { decrypt, encrypt } from "../utils/criptrUtils";




async function findAllCards(userId: number) {
    const cards = await cardRepository.findAllCards(userId);
    return cards.map(card => {
        return {
            ...card,
            password: decrypt(card.password),
            securityCode: decrypt(card.securityCode)
        }
    })
}

export async function findCard(userId: number, cardId: number) {
    const card = await cardRepository.findCard(userId, cardId);
    if (!card) throw notFoundError("Card doesn't exist");

    return {
        ...card,
        password: decrypt(card.password),
        securityCode: decrypt(card.securityCode)
    }
}

async function insertCard(userId: number, card: TCreateCreditCardData) {
    
    const existingCard = await cardRepository.findCardByTitle(userId, card.title);
    if (existingCard) throw conflictError("Title already exists");

    const cardInfos: TCreateCreditCardData = {
        ...card,
        password: encrypt(card.password),
        securityCode: encrypt(card.securityCode)
    }

    await cardRepository.insertCard(userId, cardInfos);
}

async function deleteCard(user: User, cardId: number) {
    await findCard(user.id, cardId);
    await cardRepository.deleteCard(cardId);
}

const cardService = {
    findAllCards,
    findCard,
    insertCard,
    deleteCard
}

export default cardService;