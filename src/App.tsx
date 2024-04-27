import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { NotFound } from './pages/NotFoud';
import { Header } from './pages/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Header /> }>
        <Route index element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet /> } />
        <Route path="*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
