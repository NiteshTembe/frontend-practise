
import './App.css';
import AlertContext from './context/AlertContext';
import Home from './Home';
import ShowAlert from './ShowAlert';

function App() {
  return (
    <div className="App">
      <AlertContext>
      <Home/>
      <ShowAlert/>
      </AlertContext>
    </div>
  );
}

export default App;
