import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/shared/Navbar';
import GaragePage from './pages/GaragePage';
import WinnersPage from './pages/WinnersPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
