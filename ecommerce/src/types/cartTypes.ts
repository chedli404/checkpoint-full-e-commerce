export interface CartType {
    _id: number,
    userId: string,
    price: number,
    items: [CartItemType]
    totalPrice: number
}

export interface CartItemType {
    id?: string,
    productId: string,
    quantity: number,
}