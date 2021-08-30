import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import Message from '@/components/common/Message';
import BoardPost from '../BoardPost';
import BoardHeader from '../BoardHeader';
import BoardPageNumber from '../BoardPageNumber';
import ModalPortal from '@/utils/portal';
import PostModal from '../../common/PostModal';

import DetailProductStore from '@/stores/DetailProductStore';
import { showErrorMsgTime } from '@/static/constants';
import { alertMsg } from '@/utils/errorMessage';
import AuthStore from '@/stores/AuthStore';
import RefreshStore from '@/stores/RefreshStore';

type ProductBoardProps = {
  title: string;
};

let timer: number = 0;
const initPageStart = 0;
const initPageEnd = 10;

/**
 * TODO:
 * 안되면 refresh 이용하기.
 */
const ProductBoard = ({ title }: ProductBoardProps) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [postInfoDatas, setPostInfoDatas] = useState([]);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<number[]>([]);
  const [message, setMessage] = useState<Message>({
    showMessage: false,
    messageContent: '',
  });
  const [wholeDatas, setWholeDatas] = useState([]);
  const { reviews, qnas, productId, isBuy } = DetailProductStore.product;

  useEffect(() => {
    if (title === '상품 후기') {
      setPostInfoDatas(DetailProductStore.product.reviews.slice(initPageStart, initPageEnd));
      setWholeDatas(DetailProductStore.product.reviews);
    } else if (title === '상품 문의') {
      setPostInfoDatas(DetailProductStore.product.qnas.slice(initPageStart, initPageEnd));
      setWholeDatas(DetailProductStore.product.qnas);
    }
    return () => clearTimeout(timer);
  }, [RefreshStore.refreshComponent]);

  console.log(1);
  const createMsg = (title: string) => {
    setMessage({ showMessage: true, messageContent: title });
    timer = setTimeout(() => {
      setMessage({ ...message, showMessage: false });
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: string) => {
    if (mode === 'notlogin') {
      createMsg(alertMsg['REQUIRED_LOGIN']);
    } else if (mode === 'notbuy') {
      createMsg(alertMsg['REQUIRE_BUY']);
    } else if (mode === 'alreadyWrite') {
      createMsg(alertMsg['AIREADY_WRITE']);
    }
  };

  const handleClickNumber = (e: React.MouseEvent<HTMLLIElement>) => {
    const newPageNumber = Number(e.currentTarget.dataset.idx);
    const newStartPoint = newPageNumber * 10;
    const newEndPoint = newPageNumber * 10 + 10;
    const newPostInfoDatas = wholeDatas.slice(newStartPoint, newEndPoint);
    setPageNumber(newPageNumber);
    setPostInfoDatas(newPostInfoDatas);
    setShowContent([]);
  };

  const handleClickButton = () => {
    // console.log('isBuy Value', DetailProductStore.product.isBuy, isBuy);
    if (!AuthStore.isLogined) return viewMsgByUserStatus('notlogin');
    if (title === '상품 후기' && !DetailProductStore.product.isBuy)
      return viewMsgByUserStatus('notbuy');
    if (DetailProductStore.errorOn) return viewMsgByUserStatus('alreadyWrite');
    setIsActiveModal(true);
  };

  const handleClickForClose = async () => {
    setIsActiveModal(false);
    await DetailProductStore.load(DetailProductStore.product.productId);
    RefreshStore.refresh();
  };

  const handleClickTitle = (e: React.MouseEvent<HTMLSpanElement>) => {
    const index = Number(e.currentTarget.dataset.idx);

    if (showContent.includes(index)) {
      const tempArray = [...showContent];
      const idxToDelete = tempArray.indexOf(index);
      tempArray.splice(idxToDelete, 1);
      setShowContent(tempArray);
      return;
    }
    setShowContent([...showContent, index]);
  };

  return (
    <ProductBoardContainer>
      <BoardHeader title={title} handleClickButton={handleClickButton} />
      <BoardPost
        postInfo={postInfoDatas}
        title={title}
        handleClickTitle={handleClickTitle}
        showContent={showContent}
      />
      {wholeDatas.length > 0 && (
        <BoardPageNumber
          length={wholeDatas.length}
          pageNumber={pageNumber}
          handleClickNumber={handleClickNumber}
        />
      )}
      {isActiveModal && (
        <ModalPortal>
          <PostModal
            onClose={handleClickForClose}
            title={title}
            item={{
              product: {
                ...DetailProductStore.product,
                id: DetailProductStore.product.productId,
              },
            }}
            formType={{ form: title === '상품 후기' ? 'REVIEW' : 'QNA', mode: 'ENROLL' }}
          />
        </ModalPortal>
      )}
      {message.showMessage && (
        <ModalPortal>
          <Message text={message.messageContent} mode="fail" />
        </ModalPortal>
      )}
    </ProductBoardContainer>
  );
};

export default observer(ProductBoard);

const ProductBoardContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;
