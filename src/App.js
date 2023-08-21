import './App.css';
import { BrowserRouter, Routes, Route }
  from "react-router-dom";

import NavBar from './components/NavBar';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/fav' element={<Favourites />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
