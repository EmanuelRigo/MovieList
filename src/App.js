import './App.css';
import Menu from './components/Menu';
import Footer from './components/Footer';
import List from './components/List';
import { useEffect } from 'react';



function App() {

  useEffect(() => {
    console.log("object")
    setTimeout(() => {
      console.log("holaa")

    }, 3000);
  }, [])

  return (
    <div className="App">
      <Footer></Footer>
      <List></List>
    </div>

  );
}

export default App;
