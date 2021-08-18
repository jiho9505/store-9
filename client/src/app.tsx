import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import { Router, Route, Link } from './Router';

const Header = React.lazy(() => import('@/components/base/Header'));
const Footer = React.lazy(() => import('@/components/base/Footer'));
const ButtonToMoveToTop = React.lazy(() => import('@/components/base/ButtonToMoveToTop'));
const LoginPage = React.lazy(() => import('@/pages/Login'));
const SignupMethod = React.lazy(() => import('@/pages/SignupMethod'));
const Main = React.lazy(() => import('@/pages/Main'));
const ProductList = React.lazy(() => import('@/pages/ProductList'));
const CartPage = React.lazy(() => import('@/pages/Cart'));
const Order = React.lazy(() => import('@/pages/Order'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

import '@/static/assets/img/baeminFavicon.png';

/**
 * FIXME:
 * 추후 여러 경로가 동일 컴포넌트 가리키는 것에 대한 처리 필요
 */
const App = () => {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Header />
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/order">
            <Order />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route exact path="/product/:id">
            <ProductPage />
          </Route>
          <Route exact path="/signupMethod">
            <SignupMethod />
          </Route>
          <Route exact path="/total">
            <ProductList />
          </Route>
          <Route exact path="/suplies">
            <ProductList />
          </Route>
          <Route exact path="/living">
            <ProductList />
          </Route>
          <Route exact path="/books">
            <ProductList />
          </Route>
          <Route exact path="/green">
            <ProductList />
          </Route>
          <Route exact path="/smile-edition">
            <ProductList />
          </Route>
          <Route exact path="/euljiro-edition">
            <ProductList />
          </Route>
          <Route exact path="/baedal-friends">
            <ProductList />
          </Route>
          <Route exact path="/present">
            <ProductList />
          </Route>
          <Route exact path="/collaborate">
            <ProductList />
          </Route>
          <Route exact path="/notfound">
            <NotFound />
          </Route>
        </Router>
        <ButtonToMoveToTop />
        <Footer />
      </Suspense>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-width: 1450px;
`;

const ProductPage = () => {
  return <div>This is Product Page</div>;
};

export default App;
