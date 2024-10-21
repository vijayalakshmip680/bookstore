// import { describe, expect } from "vitest";
// import AdminAuthGuard from "./AdminAuthGuard";
// import { render,screen } from "@testing-library/react";
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from '../features/authSlice';
// import cartReducer from '../features/cartSlice'
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
// describe('Admin AuthGuard',()=>{
    
//     it('renders children when user is ADMIN',()=>{

//         const store = mockStore({ id: '1', role: 'ADMIN' });

//         render(
//             <Provider store={store}>
//             <BrowserRouter>
//             <AdminAuthGuard>
//                 <div>Admin Dashboard</div>
//             </AdminAuthGuard>
//             </BrowserRouter>
//         </Provider>
//         )

//         const adminPages=screen.getByText('Admin Dashboard')
//         expect(adminPages).toBeInTheDocument()

//     })

//     it('should redirect to login when user is not admin',()=>{
//         const store=mockStore({ id: '1', role: 'USER' });
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <AdminAuthGuard>
//                     <div>Admin Dashboard</div>
//                     </AdminAuthGuard>
//                 </BrowserRouter>
//             </Provider>
//         )
//         const adminPages=screen.queryByText('Admin Dashboard')
//         expect(adminPages).not.toBeInTheDocument()
        
//     })

// })