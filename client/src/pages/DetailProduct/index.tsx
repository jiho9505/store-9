import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import Detail from '@/components/DetailProduct/Detail';
import Overview from '@/components/DetailProduct/Overview';

import { ProductContext } from '@/hooks/context';
import { normalContainerWidth } from '@/static/style/common';
import DetailProductStore from '@/stores/DetailProductStore';
import AuthStore from '@/stores/AuthStore';
import Datas from '@/dummy';

const sampleData = Datas[0];

const DetailProduct = () => {
  window.scrollTo({ top: 0 });

  const [product, setProduct] = useState<Info>({});

  let timer: number = 0;

  useEffect(() => {
    // (async () => {
    //   await DetailProductStore.load(20);
    //   console.log('DetailProductStore.products: ', toJS(DetailProductStore.products));
    //   toJS(DetailProductStore.products)
    //   setProduct(DetailProductStore.products);
    // })();

    setProduct(sampleData);
  }, [AuthStore.isLogined]);

  return (
    <ProductContext.Provider
      value={{
        info: product,
      }}
    >
      <WholeContainer>
        <DetailProductContainer>
          <Overview></Overview>
          {product.name && <Detail />}
        </DetailProductContainer>
      </WholeContainer>
    </ProductContext.Provider>
  );
};

export default observer(DetailProduct);

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailProductContainer = styled.div`
  width: ${normalContainerWidth};
`;
