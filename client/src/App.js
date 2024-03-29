import React from "react"; 
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './pages/Home';
// import Subscriptions from './pages/Subscriptions';
import Upload from './pages/UploadVideo';
// import MyCard from './components/MyCard';
import MyNavbar from './components/MyNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import CreateChannel from './pages/CreateChannel';
import MyChannels from "./pages/MyChannels";
import Home from "./pages/Home";
import Video from "./pages/Video";
import ChannelPage from "./pages/ChannelPage";
import ChannelVideos from "./pages/ChannelVideos";
import Profile from "./pages/Profile";

// import { Link } from "react-router-dom";
// import "./components/Navbar.css";

function App() {
  return (
    <>
      <Router>

        <MyNavbar />

        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/subscriptions' component={Subscriptions} /> */}
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path='/channel/new' component={CreateChannel} />
          <Route path='/channel' component={MyChannels} />
          <Route path='/video/channel/:id' component={ChannelPage} />
          <Route path='/admin/video/channel/:id' component={ChannelVideos} />
          <Route path='/video/:id' component={Video} />
          <Route path='/upload/:id' component={Upload} />
          <Route path='/profile' component={Profile} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
