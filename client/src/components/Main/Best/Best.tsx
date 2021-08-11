import React from 'react';
import styled from '@emotion/styled';

import ItemLists from '@/components/base/ItemLists/ItemLists';
import { baeminFont } from '@/static/style/common';

const Best = () => {
  return (
    <BestContainer>
      <Title>잘나가요</Title>
      <ItemLists></ItemLists>
    </BestContainer>
  );
};

const BestContainer = styled.div`
  width: 1200px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.span`
  font-family: ${baeminFont};
  font-size: 26px;
`;
export default Best;
