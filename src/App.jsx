import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChallengesPage from './pages/ChallengesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  console.log('Modo actual:', import.meta.env.MODE);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
