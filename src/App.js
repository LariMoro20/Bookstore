import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Details from './pages/Details';
import Menu from './components/Menu';
import Footer from './components/Footer';
function App() {

  return (
    <Router>
      <Menu />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" exact component={Details} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
