import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChallengesPage from './pages/ChallengesPage';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="challenges" element={<ChallengesPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
