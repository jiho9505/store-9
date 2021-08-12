import styled from '@emotion/styled';
import React from 'react';

{
  // 좋아요 클릭 시 검은 하트로 대체한다.
  /* <i className="fas fa-heart"></i>  */
}
const ItemWishButton = () => {
  return (
    <ButtonContainer>
      <IconContainer>
        <i className="far fa-heart"></i>
      </IconContainer>
      <IconContainer>
        <i className="fas fa-shopping-cart"></i>
      </IconContainer>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3px;
`;

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 12px;
  }
`;

export default ItemWishButton;
