import { Request, Response } from "express";

import cardService from "../services/cardService";

export async function insertCard(req: Request, res: Response) {
    const { user } = res.locals;
    const card = req.body;

    await cardService.insertCard(user, card);
    res.sendStatus(201);
}
export async function purchaseCard(req: Request, res: Response) {

    const { user } = res.locals;
    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
        res.sendStatus(422); 
    }

    const card = await cardService.purchaseCard(user.id, cardId);
    res.send(card);
}

export async function purchaseAllCards(req: Request, res: Response) {
    const { user } = res.locals;
    const cards = await cardService.purchaseAllCards(user.id);

    res.send(cards);
}

export async function deleteCard(req: Request, res: Response) {

    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
        res.sendStatus(422); 
    }

    const { user } = res.locals;
    await cardService.deleteCard(user, cardId);
    res.sendStatus(200);
}