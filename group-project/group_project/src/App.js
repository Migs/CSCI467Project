import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Navbar from './components/navbar';
import AssociatesPage from './views/associatespage';
import AdminPage from './views/adminpage';
import ClerkPage1 from './views/clerkpage1';
import ClerkPage2 from './views/clerkpage2';
import SetQuote from './views/setquote';
import EditQuote from './views/editquote';
import FinalizeQuote from './views/finalizequote';
import QuoteConfirmation from './views/quoteconfirmation';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path='/associatespage'><AssociatesPage /></Route>
            <Route path='/adminpage'><AdminPage /></Route>
            <Route path='/clerkpage1'><ClerkPage1 /></Route>
            <Route path='/clerkpage2'><ClerkPage2 /></Route>
            <Route path='/editquote'><EditQuote /></Route>
            <Route path='/finalizequote'><FinalizeQuote /></Route>
            <Route path='/setquote'><SetQuote /></Route>
            <Route path='/quoteconfirmation'><QuoteConfirmation /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;