import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Detail from '@/components/DetailProduct/Detail';
import Overview from '@/components/DetailProduct/Overview';

import { normalContainerWidth } from '@/static/style/common';
import DetailProductStore from '@/stores/DetailProductStore';
import { getQueryStringValue } from '@/utils/getQueryStringValue';
import ProductResponse from '@shared/dtos/product/response';

const DetailProduct = () => {
  window.scrollTo({ top: 0 });

  const [product, setProduct] = useState<ProductResponse.GetDetail>(null);

  useEffect(() => {
    (async () => {
      await DetailProductStore.load(Number(getQueryStringValue('id')));
      setProduct(DetailProductStore.product);
    })();
  }, []);

  return (
    <WholeContainer>
      <DetailProductContainer>
        <Overview></Overview>
        {product && <Detail />}
      </DetailProductContainer>
    </WholeContainer>
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
