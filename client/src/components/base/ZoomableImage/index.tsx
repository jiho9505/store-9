import React, { MutableRefObject, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

/**
 * ZoomableImage
 * @param { src: string, width: number, height?: number }
 * 사용법
 * <ZoomableImage src="image_url" width={500} height={optional} />
 */

let zoomedImgWidth = 0;
let zoomedImgHeight = 0;
const zoomSize = 175;

type position = number;

type ZoomableImageProps = {
  src: string;
  width: number;
  height?: number;
};

type ImgSizeProps = {
  width: number;
  height: number;
};

const ZoomableImage = ({ src, width = 500, height }: ZoomableImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMoveable, setMoveable] = useState<boolean>(false);
  const [zoomShow, setZoomShow] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState<position[]>([0, 0]);
  const [zoomBgPos, setZoomBgPos] = useState<position[]>([0, 0]);

  const checkMouseEntered = (w: number, h: number): boolean => {
    return w === 0 && h === 0;
  };

  const getMousePositionInContainer = (e: MouseEvent, ref: MutableRefObject<HTMLDivElement>) => {
    return [e.pageX - ref.current.offsetLeft, e.pageY - ref.current.offsetTop];
  };

  const onMouseMove = (e) => {
    const { width: currentImgWidth, height: currentImgHeight }: ImgSizeProps = imgRef.current;
    const isNeverEntered: boolean = checkMouseEntered(zoomedImgWidth, zoomedImgHeight);

    if (isNeverEntered) {
      let scale = 1;
      const imgObj: HTMLImageElement = new Image();

      imgObj.src = src;
      const { width: realImgWidth, height: realImgHeight }: ImgSizeProps = imgObj;

      if (realImgWidth < currentImgWidth || realImgHeight < currentImgHeight) {
        scale = (currentImgWidth / realImgWidth) * 2;
      }
      zoomedImgWidth = realImgWidth * scale;
      zoomedImgHeight = realImgHeight * scale;
      return;
    }

    const [mouseX, mouseY]: position[] = getMousePositionInContainer(e, containerRef);

    // 마우스 포지션이 이미지 안쪽이면 Zoom 을 moveable 가능한 상태로 변경, 아니라면 불가능한 상태로 변경
    if (0 < mouseX && mouseX < currentImgWidth && 0 < mouseY && mouseY < currentImgHeight) {
      if (isMoveable === false) setMoveable(true);
    } else {
      setMoveable(false);
      setZoomShow(false);
    }

    const getBackgroundPosition = (): position[] => {
      const x: position =
        Math.round((mouseX / currentImgWidth) * zoomedImgWidth - zoomSize / 2) * -1;
      const y: position =
        Math.round((mouseY / currentImgHeight) * zoomedImgHeight - zoomSize / 2) * -1;
      return [x, y];
    };

    const getZoomPosition = (): position[] => {
      const x: position = mouseX - zoomSize / 2;
      const y: position = mouseY - zoomSize / 2;
      return [x, y];
    };

    // Zoom이 이동가능한 상태일 떄, Zoom의 위치, Zoom 내부에 비춰질 배경의 위치, Zoom의 visible하게 상태 변경
    if (isMoveable) {
      const bgPos: position[] = getBackgroundPosition();
      const pos: position[] = getZoomPosition();

      setZoomPos(pos);
      setZoomBgPos(bgPos);
      setZoomShow(true);
    }
  };

  return (
    <ImgContainer ref={containerRef} width={width} height={height} onMouseMove={onMouseMove}>
      {zoomShow && (
        <Zoom
          boxPos={zoomPos}
          bgPos={zoomBgPos}
          bgImgWidth={zoomedImgWidth}
          bgImgHeight={zoomedImgHeight}
          size={zoomSize}
          backgroundUrl={src}
          style={{
            left: `${zoomPos[0]}px`,
            top: `${zoomPos[1]}px`,
            backgroundPosition: `${zoomBgPos[0]}px ${zoomBgPos[1]}px`,
          }}
        />
      )}
      <SmallImg ref={imgRef} src={src} width={width} height={height} alt="product-image" />
    </ImgContainer>
  );
};

export default ZoomableImage;

const setImgSize = ({ width, height }) => {
  return css`
    width: ${width}px;
    ${height ? `height: ${height}px` : ''};
  `;
};

const SmallImg = styled.img`
  ${setImgSize};
`;

const ImgContainer = styled.div<ImgSizeProps>`
  position: relative;
  ${setImgSize};
`;

type ZoomProps = {
  size: number;
  backgroundUrl: string;
  bgImgWidth: number;
  bgImgHeight: number;
  boxPos: number[];
  bgPos: number[];
};

const Zoom = styled.div<ZoomProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  position: absolute;
  border-radius: 100%;
  border: 5px solid #e4e4e4;
  background: url(${({ backgroundUrl }) => backgroundUrl}) no-repeat;
  transition: all 0.1s;
  background-size: ${({ bgImgWidth, bgImgHeight }) => `${bgImgWidth}px ${bgImgHeight}px`};
  background-color: white;
`;
