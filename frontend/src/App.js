
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Logout from './views/auth/Logout'; 
import ShowProducts from './components/ShowProducts';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct'
import NavBarMenu from './components/NavBarMenu';
import MyPosts from './components/MyPosts';
import './App.css';



const App = () => {
  return (
    <div className='App'>
      <Router>
      <NavBarMenu></NavBarMenu>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/logout' component={Logout} exact />
           <Route exact path="/showProducts" component={ShowProducts}></Route>
           <Route exact path="/addProduct" component={AddProduct}></Route>
           <Route exact path="/:id/update" component={UpdateProduct}></Route>
           <Route exact path="/myPosts" component={MyPosts}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;