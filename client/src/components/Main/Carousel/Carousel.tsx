import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import '@/static/assets/img/bannerImage1.gif';
import '@/static/assets/img/bannerImage2.gif';
import '@/static/assets/img/bannerImage3.gif';
import { greyButton } from '@/static/style/common';

/**
 * TODO:
 * 이미지 클릭 시 해당 상품으로 넘어가도록 추후 Link에 product id 달 것
 */

const timeToChangeSlide = 3000;

const Carousel = () => {
  const [index, setIndex] = useState(1);
  const [isClickEventActive, setIsClickEventActive] = useState(false);

  /**
   * button clickEvent가 일어나지 않았을때
   * index를 이동합니다. ( 이미지를 보여주기 위해서 )
   */
  useEffect(() => {
    let timer;
    if (!isClickEventActive) {
      timer = setTimeout(() => {
        const standardIndex = index + 1 > 3 ? 1 : index + 1;
        setIndex(standardIndex);
      }, timeToChangeSlide);
    } else {
      setIsClickEventActive(false);
    }
    return () => {
      clearTimeout(timer);
    };
  });

  /**
   * Carousel 안에 버튼 클릭 시 해당 이미지로 이동합니다.
   * 그 후 자동으로 슬라이드 되는 기능을 3초간 막습니다.
   */
  const onClickButton = (e: React.MouseEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    const nextIndex = Number(target.dataset.idx);
    setIndex(nextIndex);
    setIsClickEventActive(true);
  };

  return (
    <CarouselContainer>
      <ImageContainer translateX={index}>
        <SlideImage src="images/bannerImage1.gif" alt="first-banner-image" />
        <SlideImage src="images/bannerImage2.gif" alt="second-banner-image" />
        <SlideImage src="images/bannerImage3.gif" alt="third-banner-image" />
      </ImageContainer>
      <ButtonContainer>
        <Button onClick={onClickButton} data-idx="1" active={index === 1}></Button>
        <Button onClick={onClickButton} data-idx="2" active={index === 2}></Button>
        <Button onClick={onClickButton} data-idx="3" active={index === 3}></Button>
      </ButtonContainer>
    </CarouselContainer>
  );
};

type ImageProps = {
  translateX: number;
};

type ButtonProps = {
  active: boolean;
};

const CarouselContainer = styled.div`
  position: relative;
`;

const ImageContainer = styled.div<ImageProps>`
  display: flex;
  width: 100%;
  height: 500px;
  transition: all 0.5s ease-in-out;
  transform: translateX(${(props) => `${(props.translateX - 1) * -100}%`});
`;

const SlideImage = styled.img`
  width: 100%;
  cursor: pointer;
  opacity: 1;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 0px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

const Button = styled.button<ButtonProps>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: ${(props) => (props.active ? 'white' : greyButton)};
`;

export default Carousel;
