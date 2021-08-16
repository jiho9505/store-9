import React from 'react';
import styled from '@emotion/styled';
import { baemin, baeminFont, red1 } from '@/static/style/common';
import { Link } from '@/Router';
import '@/static/assets/img/notfound.gif';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Content>Page not found</Content>
      <NotFoundImage src="images/notfound.gif" />
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`;

const NotFoundImage = styled.img`
  width: 400px;
  height: 300px;
  margin: 50px 50px 50px 0px;
  border-radius: 50px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  width: 250px;
  height: 50px;
  background: ${baemin};
  border-radius: 8px;
  border: none;
  color: white;
  margin-bottom: 10px;
  font-family: ${baeminFont};
  font-size: 25px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 30px;
  color: ${red1};
  font-family: ${baeminFont};
`;

const Content = styled.div`
  font-size: 25px;
  font-family: ${baeminFont};
`;
