import React from 'react';
import styled from '@emotion/styled';
import { baemin } from '@/static/style/common';

const ArrowButton = () => {
  return (
    <Button>
      <i className="fas fa-arrow-up"></i>
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 50px;
  right: 300px;
  width: 60px;
  height: 60px;
  font-size: 40px;
  background-color: ${baemin};
  color: white;
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease-in;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

// .arrow-up.visible {
//     opacity: 1;
//     pointer-events: auto;
// }
export default ArrowButton;
