<h2 align='center'>🕊 구구 비둘기파 (9팀) 🐦</h2>

<p align='center' >
<img width="500" height="500"  alt="스크린샷 2021-08-13 오후 12 14 43" src="https://user-images.githubusercontent.com/32658347/131289707-fe4d9181-d302-4df9-ae9c-792cb4833fff.png">
</p>

<h3 align='center'>조직원 : 문지호, 안준범, 이재윤, 조혁주 </h3>
<br><br>

## 배민 문방구 프로젝트
```
게스트 로그인 / id: guest, password: 1234
           / id: guest02, password: 1234
```
### ``기능설명``

#### `` 헤더 ``

![Aug-22-2021 13-18-04](https://user-images.githubusercontent.com/50862052/130342048-b8e222cd-24d1-4e47-8034-7e6d0892e957.gif)
```
검색창
- 최근 검색어 : 로컬스토리지 커스텀훅을 이용한 최근 검색어에 대한 관리가 가능합니다.
- 자동 완성 : 한글은 초성,중성,종성에 따라 자동완성을 해야 하기 때문에 초성 중성 종성에 맞춰진 정규 표현식을 이용해 기능을 제공하였습니다.
```
![Aug-23-2021 11-43-16](https://user-images.githubusercontent.com/50862052/130382894-50099034-64e8-4541-baf7-b6bad59bbbb2.gif)
```
스마트레이어
- 많은 사람들은 하위 메뉴 이동시 대각선으로 움직이려고 합니다. 이럴 때 다른 부모 메뉴에 호버가 되면 해당 부모 메뉴의 하위 카테고리가 나타납니다.
- 이것을 막고자 디바운스 기법을 이용해 일정 시간을 기준으로 대각선으로 이동 시 현재 메뉴의 하위카테고리가 계속 유지되게 하였습니다.
```

---
#### `` 메인페이지 ``

![Aug-31-2021 12-17-28](https://user-images.githubusercontent.com/50862052/131436176-dcbb6d1a-a526-451d-88e0-e9769eae44dd.gif)
```
배민 문방구 메인페이지 화면입니다.
- 백에서의 로직을 통해 BEST & NEW & DISCOUNT 된 제품들을 제공합니다.
- 기존의 배민 문방구와 달리 상품에 평점과 관심수를 표시하여 사용자에게 상품을 미리 파악하는데 도움을 주도록 하였습니다.
```
---
#### `` 상품리스트페이지 ``

![Aug-31-2021 12-17-05](https://user-images.githubusercontent.com/50862052/131436137-08c181bf-6276-448b-83e9-69e04b2d5658.gif)
```
배민 문방구 상품리스트페이지 화면입니다
- 메뉴, 필터, 검색에 따라 상품들을 보여줍니다.
- 16개씩 불러오며 추가로 불러올 시 상품 더보기 버튼을 클릭하며 아래로 페이지를 이어나갑니다.
- 이때 사용자의 편의를 위해 하단 우측에 화살표 버튼을 추가해 이를 이용해 페이지 최상단으로 이동할 수 있게 하였습니다.
```
---
#### `` 상품상세페이지 ``

 ![Aug-31-2021 12-16-25](https://user-images.githubusercontent.com/50862052/131436088-dd5c455d-84ee-4db2-9846-b03b2c781095.gif) 

```
배민 문방구 상품오버뷰 화면입니다
- 상품에 대한 로그인의 유무 혹은 이미 찜버튼 클릭 여부 등등 여러 예외처리를 하여 찜하기, 장바구니, 바로 구매 기능을 구현하였습니다.

```

![Aug-31-2021 12-14-56](https://user-images.githubusercontent.com/50862052/131435927-064afcc7-c530-4450-85ad-1e299050491d.gif)
```
배민 문방구 리뷰 및 문의 등록 화면입니다
- 리뷰 및 문의 등록에서는 로그인 한 유저만 등록이 가능합니다.
- 문의는 여러번 작성 가능하지만 리뷰는 한번만 작성이 가능하며 상품을 구매한 사람에 한해서만 작성 가능합니다.
- 추가적으로 이 상품 상세페이지 자체가 상세페이지 컴포넌트 최상단에서 데이터를 한번 받아서 전체적으로 뿌려주는 부분인데 등록을 했을 때 
- 불필요한 렌더링을 줄이고자 Mobx를 이용해서 리뷰 및 문의를 등록했을 때 이 부분만 렌더가 될 수 있도록 렌더링 최적화를 하였습니다.
```
---
#### `` 주문하기 ``
<img width="50%" src="https://user-images.githubusercontent.com/35404137/131431994-f37ac178-f215-463a-b2c5-fb2edd2fba67.png" > 

```
배민 문방구 주문하기 화면입니다
- 선택한 품목을 구매할 수 있으며, 주무서 작성 폼에 유효성 검사 프로세스가 있습니다
```
---
#### `` 마이페이지 ``
<img width="50%" src="https://user-images.githubusercontent.com/35404137/131432350-cacf9693-8122-497e-8333-692cece0dad9.gif">

```
배민 문방구 마이페이지 화면입니다
- 찜한 상품, 구매상품, 작성한 리뷰, 작성한 문의 사항을 확인해 볼 수 있습니다.
- 구매상품과 문의 사항은 기간 별로 필터링 해볼 수 있습니다.
```
---
#### ``🔒 회원가입``

<img width="60%" src="https://user-images.githubusercontent.com/32658347/131431834-aedd31d1-4bf8-40fc-8fa8-cf05142b840a.gif" >


```
배민 문방구 회원가입 화면입니다
- 각 입력값은 입력시에 검증되고, 제출전에도 검증이 됩니다. 또한 서버에서도 검증 프로세스가 있습니다.
- 카카오 주소 api를 사용해서 주소 입력이 가능합니다.
- 깃허브를 통한 회원가입시에는 입력 항목이 조금 달라지게 됩니다.
```
---

#### ``🔒 로그인``

<img width="60%" src="https://user-images.githubusercontent.com/32658347/131432745-4a63bea1-5dfb-48c7-aad0-719933887b88.gif" >
<img width="60%" src="https://user-images.githubusercontent.com/32658347/131432863-e327ab02-ecf9-4655-ac6d-ac1313262b0b.gif" >


```
배민 문방구 로그인 화면입니다
- 일반 회원가입을 통한 로그인이 가능하고
- 깃허브 연동 로그인도 가능합니다.
- 비회원 주문은 아직 구현 전입니다.
```

### ``기술스택 ``

- <strong>Frontend : </strong>

  <a href="https://ko.reactjs.org" target="_blank"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"></a>
  <a href="https://mobx.js.org/" target="_blank"><img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"></a>
  <a href="https://webpack.js.org/" target="_blank"><img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"></a>
  <a href="https://babeljs.io/" target="_blank"><img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white"></a>
  <a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/Eslint-4B32C3?style=flat-square&logo=Eslint&logoColor=white"></a>

- <strong>Backend : </strong>

  <a href="https://aws.amazon.com/ko/s3/" target="_blank"><img src="https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"></a>
  <a href="https://expressjs.com/ko/" target="_blank"><img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"></a>
  <a href="https://jwt.io/" target="_blank"><img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON Web Tokens&logoColor=white"></a>
  <a href="https://www.mysql.com/" target="_blank"><img src="https://img.shields.io/badge/Mysql-4479A1?style=flat-square&logo=Mysql&logoColor=white"></a>
  <a href="https://jestjs.io/" target="_blank"><img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=Jest&logoColor=white"></a>


- <strong>Infra : </strong>

  <a href="https://aws.amazon.com/ko/" target="_blank"><img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"></a>
  <a href="https://www.nginx.com/" target="_blank"><img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=Nginx&logoColor=white"></a>
  <a href="https://pm2.keymetrics.io/" target="_blank"><img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white"></a>
  <a href="https://github.com/features/actions" target="_blank"><img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=GitHubActions&logoColor=white"></a>
  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"></a>


### ``팀활동 ``

- [위키](https://github.com/woowa-techcamp-2021/store-9/wiki)를 통한 팀간 지키면 좋을 규칙(ex. 코딩 컨벤션, 목표)
- [코드리뷰](https://github.com/woowa-techcamp-2021/store-9/pull/72)를 통한 서로간의 지식공유 및 배움 
  <br />
  <img src="https://user-images.githubusercontent.com/32658347/131285908-fadc9361-a3d8-4ee2-ae9e-081eef55b0ea.png" width="500" height="400" alt="code-review"/>
  <br /> <br />
  ![image](https://user-images.githubusercontent.com/32658347/131286507-0c22b19b-d985-4f38-8e5c-614c6b439f47.png)

- 위와 같은 코드리뷰에서 유발되는 다음날 아침의 [스크럼](https://github.com/woowa-techcamp-2021/store-9/wiki)회의에서의 토론

### ``폴더구조``

```
client

├── /node_modules
├── /@types
├── /config
├── .env
├── .eslintrc
├── tsconfig.json
└── /src
    ├── /apis
    ├── /components
    ├── /core
    ├── /hooks
    ├── /pages
    ├── /remotes
    ├── /static
    ├── /stores
    ├── /utils
    ├── app.tsx
    ├── index.html
    └── index.tsx
```

```
server

├── /node_modules
├── ormconfig.js
├── tsconfig.json
├── .env
├── ecosystem.config.js
├── jest.config.js
├── package.json
├── app.ts
└── /src
    ├── /@types
    ├── /api
    ├── /controllers
    ├── /entities
    ├── /middlewares
    ├── /migrations
    ├── /repositories
    ├── /routes
    ├── /tests
    └── /utils
    
```

```
shared

├── dtos
├── utils
└──  operators
```

```
others

├── .gitignore
├── prettier.config.js
└── README.md
```


