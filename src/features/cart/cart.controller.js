import CartItemModel from "./cart.model.js";

export class CartItemController {
    add(req, res) {
        const { productId, quantity } = req.query;
        const userId = req.userId;
        if (!userId) {
            res.status(404).send("UserId is required")
        }
        if (!productId) {
            res.status(404).send("ProductId is required")
        }
        CartItemModel.add(productId, userId, quantity)
        res.status(201).send("quantity added in cart")
    }

    getCartItem(req, res) {
        const userId = req.userId;
        const cartItem = CartItemModel.getCartItem(userId);
        if (cartItem) {
            res.status(200).send(cartItem)
        } else {
            res.status(404).send("CartItem not found")

        }
    }

    delete(req, res) {
        const userId = req.userId;
        const cartItemId = req.params.id;
        const error = CartItemModel.deleteCartItem(cartItemId, userId)
        if (error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).send("Cart Item is removed");
        }
    }

}