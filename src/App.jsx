import Calculator from "./components/Calculator";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="calculator-main">
        <h1>Simple Calculator</h1>
        <p>Built with React</p>
        <hr />
        <Calculator />
      </div>
      <Footer />
    </div>
  );
}

export default App;
