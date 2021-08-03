import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import React, { useState } from 'react'
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Menu from './components/Menu';
import Footer from './components/Footer';
function App() {
  const [favorites, setFavorites] = useState([])

  const handleFavAdd = (id, title) => {
    const newBook = [...favorites, {
      id: id,
      title: title
    }];
    setFavorites(newBook);
  }
  const handleFavDelete = (idbook) => {
    const newBook = favorites.filter(book => book.id !== idbook)
    setFavorites(newBook);
  }

  return (
    <Router>
      <Menu />
      <div className="container">
        <Switch>
          <Route path="/" exact render={() => <Home handleFavAdd={handleFavAdd} handleFavDelete={handleFavDelete} favorites={favorites} />} />
          <Route path="/favorites" exact render={() => <Favorites handleFavDelete={handleFavDelete} favorites={favorites} />} />
          <Route path="/details/:id" exact component={Details} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
