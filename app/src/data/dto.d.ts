declare module "JayStore" {
    export interface Product {
        id: string
        name: string
        description?: string
        price: number
        quantity?: number
        imageName?: string
    }
}