import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Overview from '@/components/DetailProduct/Overview';
import { normalContainerWidth } from '@/static/style/common';
import Datas from '@/dummy';

const sampleData = Datas[0];

const DetailProduct = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(sampleData);
  }, []);

  return (
    <WholeContainer>
      <DetailProductContainer>
        <Overview info={product}></Overview>
      </DetailProductContainer>
    </WholeContainer>
  );
};

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailProductContainer = styled.div`
  width: ${normalContainerWidth};
`;
export default DetailProduct;
