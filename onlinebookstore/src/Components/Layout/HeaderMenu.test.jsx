import { describe, expect, vi } from "vitest";
import HeaderMenu from "./HeaderMenu";
import { screen,render, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../../features/authSlice';
import cartReducer from '../../features/cartSlice'
import {logout} from '../../features/authSlice'
import { BrowserRouter } from "react-router-dom";
import { Provider ,useDispatch } from "react-redux";

const mockNavigate = vi.fn();
// Mock the react-router-dom module
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate, // Mock useNavigate
        BrowserRouter: ({ children }) => <>{children}</>, // Mock BrowserRouter
    };
});


describe('Header Menu',()=>{
    let store;
    beforeEach(() => {
        // Set up a mock store with initial state
        store = configureStore({
            reducer: {
                auth: authReducer,
                cart: cartReducer,
            },
            preloadedState: {
                auth: {
                    user: { id: '1', role: 'USER' }, // Mock logged-in user
                },
                cart: {
                    cart: [
                        { userID: '1', products: [{ id: 'p1' }, { id: 'p2' }] }, // Mock cart with products
                    ],
                },
            },
        });
    });
    it('should renders user image and logout button when user is logged in',()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                <HeaderMenu/>
                </BrowserRouter>
            </Provider>
        )
        const userimage=screen.getByAltText('userimage')
        const logoutButton=screen.getByText('Logout')
        expect(userimage).toBeInTheDocument()
        expect(logoutButton).toBeInTheDocument()

    })

    it('should display cart count when the user has items in the cart ',()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                <HeaderMenu/>
                </BrowserRouter>
            </Provider>
        )

        const cartCount=screen.getByText('2')
        expect(cartCount).toBeInTheDocument()
    })

    it('should navigate to cart when cart icon is clicked', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HeaderMenu />
                </BrowserRouter>
            </Provider>
        );

        const cartIcon = screen.getByAltText('cart-icon'); // Find cart icon by alt text
        fireEvent.click(cartIcon);

        expect(mockNavigate).toHaveBeenCalledWith('/cart'); 
    });
})