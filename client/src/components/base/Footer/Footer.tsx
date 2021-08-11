import React from 'react';
import styled from '@emotion/styled';
import '@/static/assets/img/footer_logo.png';
import { baeminFont, greySpan, greyBg1 } from '@/static/style/common';

const Footer = () => {
  return (
    <FooterElement>
      <img src="images/footer_logo.png" />
      <FooterInfoContainer>
        <FooterNav>
          <span>공지사항</span>
          <span>1:1문의</span>
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>판매처 안내</span>
        </FooterNav>
        <CompanyInfo>
          <div>
            <span>상호 : </span>
            <span>(주)우아한형제들</span>
          </div>
          <div>
            <span>대표 : </span>
            <span>김범준</span>
          </div>
          <div>
            <span>사업자등록번호 : </span>
            <span>120-87-65763</span>
          </div>
          <div>
            <span>통신판매업신고번호 :</span>
            <span>2012-서울송파-0515</span>
          </div>
          <CompanyLicense>[사업자정보확인]</CompanyLicense>
        </CompanyInfo>
        <CompanyInfo>
          <div>
            <span>팩스번호 : </span>
            <span>050-605-0041</span>
          </div>
          <div>
            <span>메일 : </span>
            <span>baemin_store@woowahan.com</span>
          </div>
          <div>
            <span>배민문방구 인스타그램 : </span>
            <span>@baemin_store</span>
          </div>
        </CompanyInfo>
        <CompanyInfo>
          <div>
            <span>주소 : </span>
            <span>서울특별시 송파구 위례성대로 2 장은빌딩</span>
          </div>
          <div>
            <span>호스팅제공 : </span>
            <span>엔에이치엔고도(주)</span>
          </div>
        </CompanyInfo>
        <Copyright>© Woowa Brothers Corp. All right Reserved</Copyright>
      </FooterInfoContainer>
    </FooterElement>
  );
};

export default Footer;

const FooterElement = styled.footer`
  display: flex;
  justify-content: center;
  padding: 50px 250px 0 250px;
  height: 260px;
  background-color: ${greyBg1};
  min-width: 1000px;
  img {
    width: 100px;
    height: 76px;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  margin-bottom: 32px;

  span {
    font-weight: bold;
    font-family: ${baeminFont};

    &:not(:last-child) {
      margin-right: 40px;
    }
  }
`;

const FooterInfoContainer = styled.div`
  margin-left: 150px;
  min-width: 700px;
`;

const CompanyInfo = styled.div`
  font-size: 12px;
  color: ${greySpan};
  display: flex;
  margin-bottom: 7px;

  div {
    &::after {
      content: '|';
      display: inline-block;
      margin: 0 7px;
      width: 1px;
      height: 10px;
    }
  }
`;

const CompanyLicense = styled.span`
  text-decoration: underline;
`;

const Copyright = styled.small`
  font-size: 12px;
  color: ${greySpan};
`;
