import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
          <Home />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;