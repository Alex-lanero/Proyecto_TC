import { Entity } from "../../shared/entity.model";

export interface Item extends Entity {
    sku: string;
    name: string;
    description: string | null
    price: number
    imageUrl?: string
    comments: string[]
    available: boolean
}
