//productId,userId,quantity

export default class CartItemModel {
    constructor(id, productId, userId, quantity) {
        this.id = id,
            this.productId = productId,
            this.userId = userId,
            this.quantity = quantity
    }

    static add(productId, userId, quantity) {
        const cartItem = new CartItemModel(productId, userId, quantity);
        cartItem.id = cartItem.length + 1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static getCartItem(userId) {
        const isCartItemPresent = cartItems.find(data => data.userId == userId);
        return isCartItemPresent;
    }

    static deleteCartItem(cartItemId) {
        const cartItemIndex = cartItems.findIndex(data => data.id == cartItemId && data.userId == userId);
        if (cartItemIndex == -1) {
            return "Item Not found";
        } else {
            cartItems.splice(cartItemIndex, 1)
        }
    }

}

var cartItems = [
    new CartItemModel(1, 1, 1, 9),
    new CartItemModel(2, 2, 2, 5)

]