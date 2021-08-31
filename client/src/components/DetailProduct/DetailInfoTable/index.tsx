import React from 'react';
import styled from '@emotion/styled';

import { baeminThickFont, greyBg1, greyLine, greySpan } from '@/static/style/common';
import DetailProductStore from '@/stores/DetailProductStore';

const DetailInfoTable = () => {
  const { name } = DetailProductStore.product;

  return (
    <DetailInfoTableContainer>
      <Title>상품필수 정보</Title>
      <Table>
        <tbody>
          <Tr>
            <Th>종류</Th>
            <Td>{name}</Td>
          </Tr>
          <Tr>
            <Th>소재</Th>
            <Td>리사이클 폴리에스터 100% </Td>
          </Tr>
          <Tr>
            <Th>색상</Th>
            <Td>민트</Td>
          </Tr>
          <Tr>
            <Th>크기</Th>
            <Td>12cm X 19.5cm</Td>
          </Tr>
          <Tr>
            <Th>제조자</Th>
            <Td>배달의민족</Td>
          </Tr>
          <Tr>
            <Th>제조국</Th>
            <Td>대한민국</Td>
          </Tr>
          <Tr>
            <Th> 취급시 주의사항</Th>
            <Td>
              표백제 및 강력 효소세제는 사용하지 마시고 단일색상 단독세탁 후 뉘어서 건조하세요. 화기
              및 고온의 물체를 피해주시고 날카로운 것에 주의하세요. 심한 마찰은 보푸라기의 원인이 될
              수 있으므로 주의해주세요.
            </Td>
          </Tr>
          <Tr>
            <Th>품질보증기준</Th>
            <Td> 관련 법 및 소비자분쟁해결 규정에 따름</Td>
          </Tr>
          <Tr>
            <Th> A/S 책임자와 전화번호</Th>
            <Td> 배민문방구 고객센터</Td>
          </Tr>
        </tbody>
      </Table>
    </DetailInfoTableContainer>
  );
};

export default DetailInfoTable;

const DetailInfoTableContainer = styled.div``;
const Table = styled.table`
  font-size: 13px;
  color: ${greySpan};
  margin-top: 30px;
`;

const Tr = styled.tr``;
const Th = styled.th`
  width: 20%;
  text-align: left;
  padding: 20px;
  background-color: ${greyBg1};
  border: 1px solid ${greyLine};
`;

const Td = styled.td`
  padding: 20px;
  border: 1px solid ${greyLine};
`;

const Title = styled.span`
  font-family: ${baeminThickFont};
  font-size: 17px;
`;
