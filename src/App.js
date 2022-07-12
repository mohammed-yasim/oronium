import './App.css';
import { BrowserRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom';

import Login from './components/Login';
import Onboarding from './components/Onboarding';
import { PrivateRoute, PublicRoute, removeUserSession } from './etc/Auth';
import screenshot from './lib/scrshot.png'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/logout" render={() => { removeUserSession(); return <Redirect to="login" /> }}></Route>
        <PrivateRoute path='/onboard' component={Onboarding} />
        <PrivateRoute path='/artist_onboard' component={ArtistOnboard} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <><NavLink to="login">Login</NavLink></>
  )
}
function ArtistOnboard() {
  return (
    <>
                <div style={{display:'flex',justifyContent:'right'}}><NavLink className="button" to="/logout">Logout</NavLink></div>
<img src={screenshot}/>
    </>
  )
}

export default App;
