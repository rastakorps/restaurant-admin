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
}

export interface Order {
    id: number;
    name: string;
    total?: number;
    saucers: OrderSaucer[];
}