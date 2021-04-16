import './App.css';
import PublicSpace from './components/PublicSpace';
import Uploader from './components/Uploader';
import Header from './components/Header';
import PersonalSpace from "./components/PersonalSpace";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


function App() {
 
  return (
    <Router>
        <div className="App">
          <Header />
          <Switch>
              <Route path="/" exact>
                  <Uploader />
                  <PublicSpace />
                
              </Route>  
              <Route path="/login" > 
                <PersonalSpace />  
              </Route> 
              
          </Switch>
        </div>
    </Router>
  );

}

export default App;
