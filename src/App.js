/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import image1 from './img/bg.png';
import pdInfos from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail1 from './routes/detail1.js';

function App() {
  let [pdInfosArr, pdInfosArrFunc] = useState(pdInfos);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/');
            }}
            className="nav_title"
          >
            Untitle
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail1');
              }}
            >
              detail1
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/about');
              }}
            >
              about
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* 메인화면 */}
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: `url(${image1})` }}
              ></div>
              <div className="orderBtnWrap">
                <Button
                  variant="dark"
                  className="orderBtn"
                  onClick={() => {
                    pdInfosArrFunc([
                      ...pdInfosArr.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        if (a.name < b.name) return 0;
                      }),
                    ]);
                  }}
                >
                  가나다순 정렬
                </Button>
              </div>

              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 3 && num >= 0) {
                      return <PdCol n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>

              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 6 && num >= 3) {
                      return <PdCol n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>

              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 9 && num >= 6) {
                      return <PdCol n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>
            </>
          }
        />

        {/* 디테일영역 */}
        <Route
          path="/detail1/:id"
          element={<Detail1 pdInfos={pdInfosArr}></Detail1>}
        />

        <Route
          path="*"
          element={
            <div className="err404">
              <div>없는페이지요</div>
              <br></br>
              <a
                className="return"
                onClick={() => {
                  navigate('/');
                }}
              >
                다시 홈으로 가기
              </a>
            </div>
          }
        />
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>맴버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="/event" element={<EventPage></EventPage>}>
          <Route path="one" element={<div>첫주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function PdCol(props) {
  return (
    <Col sm key={props.n} style={{ textAlign: 'center' }}>
      <img
        src={'https://codingapple1.github.io/shop/shoes' + props.pd.PK + '.jpg'}
        width="80%"
      />
      <h4>{props.pd.name}</h4>
      <p>{props.pd.describe}</p>
      <h5>{props.pd.price} ₩</h5>
    </Col>
  );
}

export default App;
