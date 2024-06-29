import React, { createContext, useContext, useReducer, Dispatch, useEffect } from 'react';
import Cookies from 'js-cookie';

type State = {
    quantity: number;
    cart: any[];
    cartSubTotal: number;
    cartTotal: number;
    checkout: any;
    itemSubtotal: number;
};

type Action =
    | { type: 'INCREMENT_QUANTITY' }
    | { type: 'DECREMENT_QUANTITY' }
    | { type: 'UPDATE_CART', payload: any }
    | { type: 'INCREMENT_CART_QUANTITY', payload: any }
    | { type: 'DECREMENT_CART_QUANTITY', payload: any }
    | { type: 'REMOVE_CART_ITEM', payload: any }
    | { type: 'UPDATE_CART_SUBTOTAL', payload: number }
    | { type: 'UPDATE_CART_TOTAL' }
    | { type: 'RESET' };

const CartContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const initialState: State = {
    quantity: 1,
    cart: [],
    cartSubTotal: 0,
    cartTotal: 0,
    checkout: null,
    itemSubtotal: 0,
};

const cartReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'INCREMENT_QUANTITY':
            return { ...state, quantity: state.quantity + 1 };
        case 'DECREMENT_QUANTITY':
            return { ...state, quantity: Math.max(state.quantity - 1, 0) };
        case 'UPDATE_CART':
            if (!action.payload) return state;
            const item = action.payload;
            let index = state.cart.findIndex((cartItem) => item.id === cartItem.id);
            if (index === -1) {
                return { ...state, cart: [...state.cart, item] };
            } else {
                const updatedCart = [...state.cart];
                updatedCart[index] = item;
                return { ...state, cart: updatedCart };
            }
        case 'INCREMENT_CART_QUANTITY':
            let indexInc = state.cart.findIndex((cartItem) => cartItem.id === action.payload);
            if (indexInc === -1) return state;
            const updatedCartInc = [...state.cart];
            updatedCartInc[indexInc].quantity++;
            updatedCartInc[indexInc].subtotal = updatedCartInc[indexInc].quantity * updatedCartInc[indexInc].price;
            let totalInc = 0;
            updatedCartInc.forEach((item) => {
                totalInc += item.subtotal;
            });
            return { ...state, cart: updatedCartInc, cartTotal: totalInc };
        case 'DECREMENT_CART_QUANTITY':
            let indexDec = state.cart.findIndex((cartItem) => cartItem.id === action.payload);
            if (indexDec === -1 || state.cart[indexDec].quantity === 0) return state;
            const updatedCartDec = [...state.cart];
            updatedCartDec[indexDec].quantity--;
            updatedCartDec[indexDec].subtotal = updatedCartDec[indexDec].quantity * updatedCartDec[indexDec].price;
            let totalDec = 0;
            updatedCartDec.forEach((item) => {
                totalDec += item.subtotal;
            });
            return { ...state, cart: updatedCartDec, cartTotal: totalDec };
        case 'REMOVE_CART_ITEM':
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
        case 'UPDATE_CART_SUBTOTAL':
            return { ...state, cartSubTotal: action.payload };
        case 'UPDATE_CART_TOTAL':
            let total = 0;
            state.cart.forEach((item) => {
                total += item.subtotal;
            });
            return { ...state, cartTotal: total };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        const savedState = Cookies.get('cartState');
        if (savedState) {
            const parsedState: State = JSON.parse(savedState);
            dispatch({ type: 'RESET' });
            if (parsedState.quantity) dispatch({ type: 'INCREMENT_QUANTITY' });
            if (parsedState.cart) parsedState.cart.forEach(item => dispatch({ type: 'UPDATE_CART', payload: item }));
            if (parsedState.cartSubTotal) dispatch({ type: 'UPDATE_CART_SUBTOTAL', payload: parsedState.cartSubTotal });
            if (parsedState.cartTotal) dispatch({ type: 'UPDATE_CART_TOTAL' });
            if (parsedState.checkout) dispatch({ type: 'UPDATE_CART', payload: parsedState.checkout });
            if (parsedState.itemSubtotal) dispatch({ type: 'UPDATE_CART_SUBTOTAL', payload: parsedState.itemSubtotal });
        }
    }, []);

    useEffect(() => {
        Cookies.set('cartState', JSON.stringify(state), { expires: 7 });
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
