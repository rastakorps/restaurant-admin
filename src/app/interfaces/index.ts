export interface Saucer {
    id?: number;
    name: string;
    description: string;
    price: number;
    status?: Boolean;
    imageSaucer?: {
        imageBase64?: string,
        extension?: string,
    }
    imagePath?: string
}

export interface OrderSaucer {
    id?: number;
    quantity: number;
    name?: string;
    imagePath?: string;
    pivot?: {
        quantity?: number;
        total_saucer?: number;
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