/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import image1 from './img/bg.png';
import { pdInfo1, pdInfo2, pdInfo3 } from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail1 from './routes/detail1.js';

function App() {
  let [productLayout] = useState([pdInfo1, pdInfo2, pdInfo3]);
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
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: `url(${image1})` }}
              ></div>

              {productLayout.map((el, num) => {
                return (
                  <Container key={num}>
                    <Row>
                      {el.map((pd, n) => {
                        return <PdCol key={n} pd={pd} n={n}></PdCol>;
                      })}
                    </Row>
                  </Container>
                );
              })}
            </>
          }
        />
        <Route path="/detail1" element={<Detail1></Detail1>} />
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
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.n + 1) + '.jpg'
        }
        width="80%"
      />
      <h4>{props.pd.name}</h4>
      <p>{props.pd.describe}</p>
      <h5>{props.pd.price} ₩</h5>
    </Col>
  );
}

export default App;
