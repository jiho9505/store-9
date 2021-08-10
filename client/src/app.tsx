import React from 'react';
import Header from '@/components/base/Header';
import { Router, Route, Link } from './Router';

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Navigation />
      </Router>
    </>
  );
};

const MainPage = () => {
  return <div>This is MainPage</div>;
};

const LoginPage = () => {
  return <div>This is LoginPage</div>;
};

const ProductPage = () => {
  return <div>This is Product Page</div>;
};

const Navigation = () => {
  return (
    <>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default App;
