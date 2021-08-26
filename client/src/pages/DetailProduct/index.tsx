import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Detail from '@/components/DetailProduct/Detail';
import Overview from '@/components/DetailProduct/Overview';

import { ProductContext } from '@/hooks/context';
import { normalContainerWidth } from '@/static/style/common';
import DetailProductStore from '@/stores/DetailProductStore';
import Datas from '@/dummy';

const sampleData = Datas[0];

const DetailProduct = () => {
  const { products, load } = DetailProductStore;
  window.scrollTo({ top: 0 });

  const [product, setProduct] = useState<Info>({});

  let timer: number = 0;

  useEffect(() => {
    // (async() =>{
    //   await load();
    //   setProduct(products);
    // })()

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
