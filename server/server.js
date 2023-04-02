//common방식으로 익스프레스 임폴트
const express = require('express');
//common방식으로 cors 임폴트(요청시 락방지)
const cors = require('cors');
//common방식으로 cookie생성 임폴트
const cookieParser = require('cookie-parser');
//common방식으로 session(쿠키) 임폴트(브라우저 닫히면 사라짐)
const session = require('express-session');
//common방식으로 path 임폴트 (리액트 뷰파일 연결)
const path = require('path');

//익스프레스 기능 연결
const app = express();
//포트번호 설정
const PORT = 4000;

//쿠키와 쿠키세션 실행
app.use(cookieParser());
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 600,
    },
  }),
);
//cors기능 실행
app.use(cors());
//리액트 빌드로 생성된 static 영역을 연결
app.use(express.static(path.join(__dirname, '../build')));
//form태그로 넘어오는 정보를 JSON형식으로 렌더링
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//내부에서 연결
//메인 라우터 연결
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//DB에서 상품데이터를 가져오고 싶을 떄
app.get('/product', (req, res) => {
  res.json({ name: 'black shoes' });
});

//리액트 라우터를 활용한 주소 접근법
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//에러시 에러스택을 콘솔에 표시하고, 에러 스테이터스코드 발생시키기
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

//포트연결
app.listen(PORT, () => {
  console.log(`${PORT}포트에서 서버 실행 중 입니다.`);
});
