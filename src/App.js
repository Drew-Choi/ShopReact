/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import image1 from './img/bg.png';
import { pdInfo1, pdInfo2, pdInfo3 } from './data.js';

function App() {
  let [productLayout] = useState([pdInfo1, pdInfo2, pdInfo3]);

  console.log(productLayout);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="nav_title">
            Untitle
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Outer</Nav.Link>
            <Nav.Link href="#">Hat</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
