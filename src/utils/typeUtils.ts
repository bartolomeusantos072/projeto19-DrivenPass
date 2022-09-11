import { User, CreditCard, Credential, NetWork, NoteSafe } from "@prisma/client";

export type TCreateUserData = Omit<User, "id">;

export type TCreateCreditCardData = Omit<CreditCard, "id">;

export type TCreateCredentialData = Omit<Credential, "id">;

export type TCreateNetworkData = Omit<NetWork, "id">;

export type TCreateNoteSafe = Omit<NoteSafe,"id">

