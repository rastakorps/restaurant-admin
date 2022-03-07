export interface Saucer {
    id?: number;
    name: string;
    description: string;
    price: number;
    status?: Boolean;
}

export interface OrderSaucer {
    id?: number;
    quantity: number;
    pivot?: {
        quantity?: number
    };
}

export interface Order {
    id?: number;
    name: string;
    total?: number;
    status?: string,
    created_at?: Date,
    updated_at?: Date,
    saucers: OrderSaucer[];
}

export interface SingleOrder {
    id?: number;
    name: string;
    total: number;
    status: string,
    created_at: Date,
    updated_at: Date
}