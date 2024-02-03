import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: localStorage.getItem('cart-item')
            ? JSON.parse(localStorage.getItem('cart-item'))
            : [],
        totalPrice: localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0
    },
    reducers: {
        addToCart: (state, action) => {
            const itemCartIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemCartIndex !== -1) {
                // Item is already in the cart, update quantity
                state.cart[itemCartIndex] = {
                    ...state.cart[itemCartIndex],
                    quantity: state.cart[itemCartIndex].quantity + 1,
                };
            } else {
                // Item is not in the cart, add it with quantity 1
                state.cart.push({ ...action.payload, quantity: 1 });
                console.log('cart item', action.payload);
            }
            localStorage.setItem('cart-item', JSON.stringify(state.cart));
            toast.success('successfully added to cart')
            const cartItem = JSON.parse(localStorage.getItem('cart-item'));
            const itemPrice = cartItem.reduce((total, item) => { return total + item.price * item.quantity; }, 0);
            state.totalPrice = itemPrice;
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        },
        removeFromCart: (state, action) => {
            const removedItem = state.cart.find(
                (cartItem) => cartItem.id === action.payload
            );

            if (removedItem) {
                state.cart = state.cart.filter(
                    (cartItem) => cartItem.id !== action.payload
                );
                state.totalPrice -= removedItem.price;
            }
            localStorage.setItem('cart-item', JSON.stringify(state.cart));
            const cartItem = JSON.parse(localStorage.getItem('cart-item'));
            const itemPrice = cartItem.reduce((total, item) => { return total + item.price * item.quantity; }, 0);
            state.totalPrice = itemPrice
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
            toast.error('successfully remove to cart')

        },

        increaseQuantity: (state, action) => {
            const itemCartIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemCartIndex !== -1) {
                state.cart[itemCartIndex] = {
                    ...state.cart[itemCartIndex],
                    quantity: state.cart[itemCartIndex].quantity + 1,
                };
            }
            localStorage.setItem('cart-item', JSON.stringify(state.cart));
            const cartItem = JSON.parse(localStorage.getItem('cart-item'));
            const itemPrice = cartItem.reduce((total, item) => { return total + item.price * item.quantity; }, 0);
            state.totalPrice = itemPrice
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        },
        decreaseQuantity: (state, action) => {
            const itemCartIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemCartIndex !== -1 && state.cart[itemCartIndex].quantity > 1) {
                state.cart[itemCartIndex] = {
                    ...state.cart[itemCartIndex],
                    quantity: state.cart[itemCartIndex].quantity - 1,
                };
            } else {
                state.cart = state.cart.filter(
                    (item) => item.id !== action.payload.id
                );
            }
            localStorage.setItem('cart-item', JSON.stringify(state.cart));
            const cartItem = JSON.parse(localStorage.getItem('cart-item'));
            const itemPrice = cartItem.reduce((total, item) => { return total + item.price * item.quantity; }, 0);
            state.totalPrice = itemPrice
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        },
        totalPriceProducts: (state) => state.totalPrice,
        clearCart(state, action) {
            state.cart = [];
            state.totalPrice = 0;
            localStorage.setItem("cart-item", JSON.stringify(state.cart));
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
            toast.error("Cart cleared", { position: "bottom-left" });
        },
    },
});

export default cartSlice.reducer;
export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPriceProducts,
    clearCart
} = cartSlice.actions;
