import Index from "./Index"
import { configureStore } from "@reduxjs/toolkit"
import { it,describe, expect } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import authReducer, {login} from '../../features/authSlice'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import Login from "./Index"
import { loginUser } from "../../features/authService"
import axios from "axios"
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);

describe('Login Component',()=>{
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
            preloadedState: {
                auth: {
                    isError: false,
                    isSuccess: false,
                    user: null,
                },
            },
        });
    });
    it('should render Login component',()=>{

        render(
            <Provider store={store}>
                <BrowserRouter>
                <Login/>
                </BrowserRouter>
            </Provider>
        )
        expect(screen.getByText('Sign In')).toBeInTheDocument()
    })
    it('should allow users to type in the username and password fields',()=>{

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const username=screen.getByLabelText(/User Name/i)
        const password=screen.getByLabelText(/Password/i)
        fireEvent.change(username,{target:{value:'testuser'}})
        fireEvent.change(password,{target:{value:'testpassword'}})

        expect(username.value).toBe('testuser')
        expect(password.value).toBe('testpassword')
    })

    it('should display error message when submitting empty fields',()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText('Login'));
        expect(screen.getByText('Please Enter the username')).toBeInTheDocument();
        expect(screen.getByText('Please Enter the password')).toBeInTheDocument();
    })
    it('should dispatches login action on valid submission',async()=>{
        const mockLogin = vi.spyOn(store, 'dispatch');
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/User Name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
        fireEvent.click(screen.getByText('Login'));

        expect(mockLogin).toHaveBeenCalled();

        expect(mockLogin).toHaveBeenCalledWith(expect.any(Function));
        const dispatchedFunction = mockLogin.mock.calls[0][0]; // Get the function that was dispatched
        expect(typeof dispatchedFunction).toBe('function');  
    })
})
