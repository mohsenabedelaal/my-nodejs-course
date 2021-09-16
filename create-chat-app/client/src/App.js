import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./UserContext";
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/chat/:room_id/:room_name" component={Chat} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
