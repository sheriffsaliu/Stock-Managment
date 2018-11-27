import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './assets/bootstrap/css/bootstrap.css';
import Navbar from './component/Navbar/Navbar';
import ListBrands from './component/Brand/ListBrands';
import ListCategories from './component/Category/ListCategory';
import NotFound from './component/NotFound/Notfound';

const NewRoute = () => {
  return (
    <div>

      <ListBrands />
      <ListCategories />
    </div>
  );
}

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch >
            <Route path="/" component={NewRoute} exact />
            <Route path="/brands" component={ListBrands} />
            <Route path="/categories" component={ListCategories} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
