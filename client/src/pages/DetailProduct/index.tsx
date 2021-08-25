import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Detail from '@/components/DetailProduct/Detail';
import Overview from '@/components/DetailProduct/Overview';

import { ProductContext } from '@/hooks/context';
import { normalContainerWidth } from '@/static/style/common';

import Datas from '@/dummy';

const sampleData = Datas[0];

/**
 * FIXME:
 * Mobx 쓰면 렌더링의 효율성을 더 높힐 수 있을 것 같습니다.
 */
const DetailProduct = () => {
  window.scrollTo({ top: 0 });

  const [product, setProduct] = useState<Info>({});

  let timer: number = 0;

  useEffect(() => {
    setProduct(sampleData);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        info: product,
      }}
    >
      <WholeContainer>
        <DetailProductContainer>
          <Overview></Overview>
          {product.title && <Detail />}
        </DetailProductContainer>
      </WholeContainer>
    </ProductContext.Provider>
  );
};

export default DetailProduct;

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailProductContainer = styled.div`
  width: ${normalContainerWidth};
`;
