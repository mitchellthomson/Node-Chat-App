import './App.css';
import {Route} from "react-router-dom";
import Home from "./Routes/Home";
import Chat from "./Routes/Chat";

function App() {
  return (
    <div className="App">
      <Route path="/" component = {Home} exact />
      <Route path ="/chats" component = {Chat}/>
    </div>
  );
}

export default App;
