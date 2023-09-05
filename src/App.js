import './App.css';
import Menu from './components/Menu';
import Main from './components/Main'
import Footer from './components/Footer';
import List from './components/List';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';



function App() {

  useEffect(() => {
    console.log("object")
    setTimeout(() => {
      console.log("holaa")

    }, 3000);
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Footer></Footer>
        <Main></Main>

      </BrowserRouter>
    </div>

  );
}

export default App;
