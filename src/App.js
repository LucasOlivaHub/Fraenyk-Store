import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartContainer } from './components/CartContainer/CartContainer';
import { DetailContainer } from './components/DetailContainer/DetailContainer';
import { Header } from './components/Header/Header';
import { IndexContainer } from './components/IndexContainer/IndexContainer';

import { StoreProvider } from './Context/StoreProvider';
import { CartForm } from './components/CartForm/CartForm';
import { MainScreen } from './components/IndexContainer/MainScreen';
import { Footer } from './components/Footer/Footer';
import { SuccesfulPurchase } from './components/PurchaseContainer/SuccesfulPurchase';

function App() {
  return (
    <div className="App">
      <StoreProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Header/><MainScreen/><Footer/></>}/>
        <Route path='/product/:id/:nombre' element={<><Header/><DetailContainer/><Footer/></>}/>
        <Route path='/products/:categoria?' element={<><Header/><IndexContainer/><Footer/></>}/>
        <Route path='/products/:categoria/:id/:nombre' element={<><Header/><IndexContainer/><Footer/></>}/>
        <Route path='/carrito' element={<CartContainer/>}/>
        <Route path='/carrito/formulario/:id' element={<><Header/><CartForm/></>}/>
        <Route path='/comprafinalizada/:compraid' element={<><Header/><SuccesfulPurchase/></>}/>
      </Routes>
     </BrowserRouter>
     </StoreProvider>
    </div>
  );
}

export default App;
