import { Suspense, useState } from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import '@smastrom/react-rating/style.css'

import Router from './Router'
import Loader from './Components/Layout/Loader'

function App() {
  return (
    <Provider store={store}>

    <BrowserRouter>
    <ToastContainer/>
    <Suspense>
    <Router fallback={<Loader/>}/>
    </Suspense>
    </BrowserRouter>
    </Provider>
  )
}

export default App
