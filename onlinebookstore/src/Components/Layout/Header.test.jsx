import { describe, expect, it } from "vitest";
import Header from "./Header";
// header using link so that we are importing this
import { BrowserRouter } from "react-router-dom";
import { render , screen} from "@testing-library/react";

import {store} from '../../App/store'
import { Provider } from "react-redux";



describe('Header Component',()=>{
    it('should render the header with correct title',()=>{

        render(
         
            <Provider store={store}>

            <BrowserRouter>
               <Header/>

            </BrowserRouter>
            </Provider>
            
        )
        const title=screen.getByText('Book Store')
        expect(title).toBeInTheDocument()
    })
    it('should render the header menu component',()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Header/>
                </BrowserRouter>
            </Provider>
        )

        const headermenu=screen.getByAltText('userimage')
        expect(headermenu).toBeInTheDocument()
    })

    it('link should redirect to correct path',()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Header/>
                </BrowserRouter>
            </Provider>
        )

        const link=screen.getByText('Book Store').closest('a')
        expect(link).toHaveAttribute('href','/')
    })
})