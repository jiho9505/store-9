import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import { Router, Route } from './core/Router';

const Header = React.lazy(() => import('@/components/Header'));
const Footer = React.lazy(() => import('@/components/Footer'));
const ButtonToMoveToTop = React.lazy(() => import('@/components/ButtonToMoveToTop'));
const LoginPage = React.lazy(() => import('@/pages/Login'));
const SignupMethod = React.lazy(() => import('@/pages/SignupMethod'));
const Main = React.lazy(() => import('@/pages/Main'));
const ProductList = React.lazy(() => import('@/pages/ProductList'));
const CartPage = React.lazy(() => import('@/pages/Cart'));
const Order = React.lazy(() => import('@/pages/Order'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const Signup = React.lazy(() => import('@/pages/Signup'));
const Callback = React.lazy(() => import('@/components/common/Callback'));
const DetailProduct = React.lazy(() => import('@/pages/DetailProduct'));

import '@/static/assets/img/baeminFavicon.png';
import Loading from './components/common/Loading';

const App = () => {
  return (
    <PageContainer>
      <Suspense
        fallback={
          <LoadingContainer>
            <Loading size="big"></Loading>
          </LoadingContainer>
        }
      >
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
          <Route exact path="/signupMethod">
            <SignupMethod />
          </Route>
          <Route exact path="/goods">
            <ProductList />
          </Route>
          <Route exact path="/detail">
            <DetailProduct />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/callback">
            <Callback />
          </Route>
          <Route exact path="/:notfound">
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

const LoadingContainer = styled.div`
  position: absolute;
  left: 45%;
  top: 35%;
`;

export default App;
