import { Product } from 'JayStore';
import http from 'services/Http'

export const fetchProduct = (productId: string) => {
    return http.get(`products/${productId}`)
        .then(response => <Product>response.data.data)
}

export const fetchProducts = () => {
    return http.get('products/')
        .then(response => <Product[]>response.data.data)
}

export const deleteProduct = (productId: string) => {
    return http.delete(`products/${productId}`);
}

export const saveProduct = (product: Product, image: File) => {
    // update product if it exists or create it if it doesn't
    return http.request({
        method: product.id ? 'put' : 'post',
        url: 'products' + (product.id ? '/' + product.id : ''),
        data: product,
    })
        .then((response) => {
            const data: Product = response.data.data;
            if (image) {
                // Only upload image if an image has been defined
                return uploadProductImage(image, data.id);
            } else {
                return data;
            }
        })
}

export const uploadProductImage = (image: File, productId: string) => {
    var formData = new FormData()

    formData.append('product_id', productId)
    formData.append('product_image', image)

    // Upload (PUT) the product image before resolving the response
    return http.put('products/upload', formData)
        // Since the server has associated the product with the image
        // we now need to refresh (GET) the product data to get this information
        .then(() => fetchProduct(productId))
}
