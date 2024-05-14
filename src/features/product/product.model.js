import applicationError from "../../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
    constructor(id, name, desc, price, imageUrl, category, sizes) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }

    static getAll() {
        return products;
    }

    static addProduct(inputObject) {
        products.id = products.length + 1;
        products.push(inputObject);
        return products;
    }

    static get(id) {
        const product = products.find((data) => data.id == id);
        return product;
    }

    static filter(minPrice, maxPrice, categoryPasssed) {
        const result = products.filter((data) => {
            return (
                (!minPrice || data.price >= minPrice) &&
                (!maxPrice || data.price <= maxPrice) &&
                (!categoryPasssed || data.category == categoryPasssed)
            )

        });
        return result;
    }

    static rateProduct(userID, productID, rating) {
        //1. validate user & product
        const isUserExist = UserModel.getAll().find(data => data.id == userID);
        if (!isUserExist) {
            //user defined error
            throw new applicationError('User not found',404)
        }
        const isProductExist = products.find(data => data.id == productID);
        if (!isProductExist) {
            throw new Error('Product not found')
        }

        //2.check if there are any rating & if not add raing array
        if (!isProductExist.ratings) {

            isProductExist.ratings = [];
            isProductExist.ratings.push({ userID: userID, rating: rating });
        } else {
            //check if user rating already available
            const existingRatingIndex = isProductExist.ratings.findIndex(data => data.userID == userID);
            //means product has raing available but our user hasn rated then will return undefined else will reurn its index
            // then if user raing present then will update rating with new rating
            if (existingRatingIndex >= 0) {
                isProductExist.ratings[existingRating] = {
                    userID: userID,
                    rating: rating
                }
            } else {
                //if no existing rating add new rating
                isProductExist.ratings.push({ userID: userID, rating: rating });
            }
        }
    }

}

var products = [
    new ProductModel(1, 'Product1', 'Description of Prod 1', 19.99, 'https://toyzone.in/cdn/shop/products/723934.jpg?v=1668491719', 'Category1', ['M', 'XL'])
    , new ProductModel(2, 'Product2', 'Description of Prod 2', 89.99, 'https://toyzone.in/cdn/shop/products/976458.jpg?v=1668512269', 'Category1', [40, 32, 38])
    , new ProductModel(3, 'Product3', 'Description of Prod 3', 59.99, 'https://toyzone.in/cdn/shop/products/46_d00bf425-8007-4b84-8327-558af8144740.jpg?v=1668585732', ['M', 'L', 'XL'])
    , new ProductModel(4, 'Product4', 'Description of Prod 4', 49.99, 'https://toyzone.in/cdn/shop/products/723934.jpg?v=1668491719')

];
