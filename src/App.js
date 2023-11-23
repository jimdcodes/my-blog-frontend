import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import ImagePage from './pages/ImagePage';
import NotFoundPage from './pages/NotFoundPage';
import ImageGallery from './imagehelper';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import CovidTrackerPage from './pages/CovidTrackerPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          {/* <Route path="/" element={<Page />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/images" element={<ImagePage />} />
          <Route path="/CT" element={<CovidTrackerPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/typo/test/asd" element={<ImageGallery />} />
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;