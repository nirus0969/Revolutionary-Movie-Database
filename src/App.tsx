import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage.tsx';
import MovieInfoPage from './pages/MovieInfoPage.tsx';
import SearchBar from './components/searchBar/SearchBar.tsx';
import NavBar from './components/navBar/NavBar.tsx';
import { Spacer } from '@nextui-org/react';
import UserWatchListPage from './pages/UserWatchListPage.tsx';
import { useTheme } from './hooks/useTheme.ts';
import { AuthProvider } from './contexts/AuthProvider.tsx';

const App = () => {
  const { isDarkMode } = useTheme();
  return (
    <main className={isDarkMode ? 'dark text-foreground bg-background' : ''}>
      <AuthProvider>
        <BrowserRouter basename="/project2">
          <NavBar />

          <div id="main-content">
            <Spacer y={8} />
            <SearchBar />
            <Spacer y={10} />
            <Routes>
              <Route path="/" Component={SearchPage} />
              <Route path="/search" Component={SearchPage} />
              <Route path="/movie/:movieId" Component={MovieInfoPage} />
              <Route path="/watchlist" Component={UserWatchListPage} />
              <Route
                path="*"
                element={
                  <>
                    <h1 className="text-center">404 </h1>
                    This page does not exist
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
};

export default App;
