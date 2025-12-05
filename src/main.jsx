import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MyContext from './myCongtext/MyContext.jsx'
import { Provider } from 'react-redux';
import { store } from './reduxToolKit-store/store.js';
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <MyContext>


      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider >

      </BrowserRouter>
    </MyContext>
  </StrictMode>,
)
