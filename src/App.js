/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { 
  Navbar, Container, Nav, Row, Col
} from 'react-bootstrap';
import './App.css';
import image1 from './img/bg.png';

function App() {

  let [productTitle1] = useState([
    {
      name: "신발1",
      describe: "편안한 스티커즈"
    },
    {
      name: "신발2",
      describe: "가벼운 런닝화"
    },
    {
      name: "신발3",
      describe: "스타일 에어"
    }
  ]);

  let [productTitle2] = useState([
    {
      name: "신발4",
      describe: "기능화"
    },
    {
      name: "신발5",
      describe: "패션화"
    },
    {
      name: "신발6",
      describe: "에어 조던"
    }
  ]);

  let [productTitle3] = useState([
    {
      name: "신발7",
      describe: "아름다운"
    },
    {
      name: "신발8",
      describe: "깔끔한"
    },
    {
      name: "신발9",
      describe: "여성전용"
    }
  ]);

  let [productLayout] = useState([
    productTitle1, productTitle2, productTitle3
  ])

  console.log(productLayout);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className='nav_title'>Untitle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Outer</Nav.Link>
            <Nav.Link href="#">Hat</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{ backgroundImage : `url(${image1})` }}></div>
      
      {productLayout.map((el, num) => {
        return (
       <Container key= {num}>
         <Row>
        {el.map ((pd, n) => {
        return (

          <Col sm key= {n} style= {{ textAlign: "center" }}>
          <img src= {'https://codingapple1.github.io/shop/shoes' + (n +1) + '.jpg'} width="80%" />
          <h4>{pd.name}</h4>
          <p>{pd.describe}</p>
          </Col>
        )
        })
        }
          </Row>
        </Container>
        )
      })
      }
      

    </div>
  );
}

export default App;
