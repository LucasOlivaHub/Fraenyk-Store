import { Routes, Route, HashRouter } from 'react-router-dom';
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
import { Fallback } from './components/Fallback/Fallback';

function App() {

  return (
    <div className="App">
      <StoreProvider>
      <HashRouter basename='/'>
      <Routes>
        <Route path='/' element={<><Header/><MainScreen/><Footer/></>}/>
        <Route path='/product/:id/:nombre' element={<><Header/><DetailContainer/><Footer/></>}/>
        <Route path='/products/:categoria?' element={<><Header/><IndexContainer/><Footer/></>}/>
        <Route path='/carrito' element={<CartContainer/>}/>
        <Route path='/carrito/formulario/:id' element={<><Header/><CartForm/></>}/>
        <Route path='/comprafinalizada/:compraid' element={<><SuccesfulPurchase/></>}/>
        <Route path='*' element={<><Header/><Fallback/></>}/>
      </Routes>
     </HashRouter>
     </StoreProvider>
    </div>
  );
}

export default App;
