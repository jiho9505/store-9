import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Detail from '@/components/DetailProduct/Detail';
import Overview from '@/components/DetailProduct/Overview';
import Message from '@/components/common/Message';

import ModalPortal from '@/utils/portal';
import { ProductContext } from '@/hooks/context';
import { normalContainerWidth } from '@/static/style/common';

import Datas from '@/dummy';
import { requireLoginMsg } from '@/static/constants';

const sampleData = Datas[0];
const showErrorMsgTime = 1500;

type MessageModeType = 'success' | 'fail';

/**
 * FIXME:
 * Mobx 쓰면 렌더링의 효율성을 더 높힐 수 있을 것 같습니다.
 */
const DetailProduct = () => {
  window.scrollTo({ top: 0 });

  const [product, setProduct] = useState<Info>({});
  const [showMessage, setshowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [messageMode, setMessageMode] = useState<MessageModeType>('fail');

  let timer: number = 0;

  useEffect(() => {
    setProduct(sampleData);
    clearTimeout(timer);
  }, []);

  const createMsg = (mode: MessageModeType, title: string) => {
    setshowMessage(true);
    setMessageMode(mode);
    setMessageContent(title);
    timer = setTimeout(() => {
      setshowMessage(false);
    }, showErrorMsgTime);
  };

  /**
   * TODO:
   *
   * User login 유무 파악해서 처리 다르게 해야합니다
   */
  const handleClickLikeButton = () => {
    /**
     * 로그인 안됐을때
     */
    createMsg('fail', requireLoginMsg);
  };

  /**
   * TODO:
   * api의 반환 값을 product에 넣기
   *
   * User login 유무 파악해서 처리 다르게 해야합니다
   * 구매한 사람만 쓸 수 있게 예외처리 해야합니다.
   */
  const handleClickReviewRegisterBtn = () => {
    /**
     * 로그인 안됐을때
     */
    createMsg('fail', requireLoginMsg);
  };

  /**
   *  TODO:
   * api의 반환 값을 product에 넣기
   *
   * User login 유무 파악해서 처리 다르게 해야합니다
   * 로그인 한 사람만
   *
   * 다 private mode일지는 추후 여부
   */
  const handleClickQnARegisterBtn = () => {
    /**
     * 로그인 안됐을때
     */
    createMsg('fail', requireLoginMsg);
  };

  return (
    <ProductContext.Provider
      value={{
        info: product,
        handleClickLikeButton,
        handleClickReviewRegisterBtn,
        handleClickQnARegisterBtn,
      }}
    >
      <WholeContainer>
        <DetailProductContainer>
          <Overview></Overview>
          {product.title && <Detail />}
        </DetailProductContainer>
      </WholeContainer>
      {showMessage && (
        <ModalPortal>
          <Message text={messageContent} mode={messageMode} />
        </ModalPortal>
      )}
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
