import "./App.css";
import Appbar from "./components/Appbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Appbar />

      {/* TODO: Routing stuffs */}
      <Home />
    </div>
  );
}

export default App;
