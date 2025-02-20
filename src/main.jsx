import { createRoot } from 'react-dom/client'
//Style
import './index.css'
//Router
import AppRouter from './router/index'
//Redux
import {store, persistor} from './store'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
)
