import { User } from "@prisma/client";
import { TCreateCreditCardData } from "../utils/typeUtils.js";

import { decrypt, encrypt } from "../utils/criptrUtils.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import * as cardRepository from "./../repositories/cardRepository.js";



async function purchaseAllCards(userId: number) {
    const cards = await cardRepository.purchaseAllCards(userId);
    return cards.map(card => {
        return {
            ...card,
            password: decrypt(card.password),
            securityCode: decrypt(card.securityCode)
        }
    })
}

export async function purchaseCard(userId: number, cardId: number) {
    const card = await cardRepository.purchaseCard(userId, cardId);
    if (!card) throw notFoundError("Card doesn't exist");

    return {
        ...card,
        password: decrypt(card.password),
        securityCode: decrypt(card.securityCode)
    }
}

async function insertCard(user: User, card: TCreateCreditCardData) {

    const existingCard = await cardRepository.purchaseCardByTitle(user.id, card.title);
    if (existingCard) throw conflictError("Title already exists");

    const cardInfos: TCreateCreditCardData = {
        ...card,
        password: encrypt(card.password),
        securityCode: encrypt(card.securityCode)
    }

    await cardRepository.insertCard(user.id, cardInfos);
}

async function deleteCard(user: User, cardId: number) {
    await purchaseCard(user.id, cardId);
    await cardRepository.deleteCard(cardId);
}

const cardService = {
    purchaseAllCards,
    purchaseCard,
    insertCard,
    deleteCard
}

export default cardService;