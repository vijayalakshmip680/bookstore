// import { describe, expect } from "vitest";
// import UserAuthGuard from "./UserAuthGuard"
// import { render,screen } from "@testing-library/react";
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from '../features/authSlice';
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";

// const mockStore = (user) => {
//     return configureStore({
//         reducer: {
//             auth: authReducer,
//         },
//         preloadedState: {
//             auth: {
//                 user,
//             },
//         },
//     });
// };
// describe('User AuthGuard',()=>{
    
//     it('renders children when user is USER',()=>{

//         const store = mockStore({ id: '1', role: 'USER' });

//         render(
//             <Provider store={store}>
//             <BrowserRouter>
//             <UserAuthGuard>
//                 <div>User Pages</div>
//             </UserAuthGuard>
//             </BrowserRouter>
//         </Provider>
//         )

//         const adminPages=screen.getByText('User Pages')
//         expect(adminPages).toBeInTheDocument()

//     })

//     it('should redirect to login when user is not admin',()=>{
//         const store=mockStore({ id: '1', role: 'ADMIN' });
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <UserAuthGuard>
//                     <div>User Pages</div>
//                     </UserAuthGuard>
//                 </BrowserRouter>
//             </Provider>
//         )
//         const adminPages=screen.queryByText('User Pages')
//         expect(adminPages).not.toBeInTheDocument()
        
//     })

// })