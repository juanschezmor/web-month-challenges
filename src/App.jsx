import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddChallengePage from './pages/AddChallengePage';
import Header from './components/Header';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add-challenge" element={<AddChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
