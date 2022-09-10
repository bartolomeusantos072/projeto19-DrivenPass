import { User, CreditCard, Credential, NetWork, NoteSafe } from "@prisma/client";

export type CreateUserData = Omit<User, "id">;

export type TCreateCreditCardData = Omit<CreditCard, "id">;

export type CreateCredentialData = Omit<Credential, "id">;

export type CreateNetworkData = Omit<NetWork, "id">;

export type CreateNoteSafe = Omit<NoteSafe,"id">

