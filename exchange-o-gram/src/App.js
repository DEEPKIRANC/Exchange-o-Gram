
import './App.css';
import PublicSpace from './components/PublicSpace';
import Uploader from './components/Uploader';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Uploader />
      <PublicSpace />
    </div>
  );
}

export default App;
