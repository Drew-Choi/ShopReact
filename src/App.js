/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
import { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import image1 from './img/bg.png';
import pdInfos from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Cart from './routes/Cart';
import RecentPd from './components/RecentPd';
import { useQuery } from 'react-query';
import MemoChild from './components/MemoChild';
import UseMemoChild from './components/UseMemoChild';

const Detail1 = lazy(() => import('./routes/detail1'));

//ContextAPI 만들기 1.
// export let Context1 = createContext();

function App() {
  let [pdInfosArr, pdInfosArrFunc] = useState(pdInfos);
  let [turnSort, turnSortFunc] = useState('off');
  let navigate = useNavigate();
  let [mainChartBtn, setMainChartBtn] = useState(1);
  let [재고] = useState([10, 11, 12]);

  let result = useQuery('data', () => {
    return (
      axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
        return a.data;
      }),
      //refetch 기능을 2초 간격으로 주는 것
      { staleTime: 2000 }
    );
  });
  //useQuery좋은점
  //result.data (가져온 데이터 정보)
  //result.isLoading (로딩중일때)
  //result.error (에러날때)
  useEffect(() => {
    if (localStorage.length === 0)
      localStorage.setItem('watched', JSON.stringify([]));
  }, []);

  const [countTest, setCountTest] = useState(0);

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
            <Nav.Link style={{ position: 'absolute', right: '20px' }}>
              {result.isLoading ? '로딩 중' : result.data.name}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <UseMemoChild />
      {/* <MemoChild /> */}
      <button onClick={() => setCountTest((cur) => cur + 1)}>
        랜더링 발생시키기
      </button>
      {countTest}

      <Routes>
        {/* 메인화면 */}
        <Route
          path="/"
          element={
            <>
              <RecentPd pdInfosArr={pdInfosArr} />
              <div
                className="main-bg"
                style={{ backgroundImage: `url(${image1})` }}
              ></div>
              <div className="orderBtnWrap">
                <Button
                  variant="dark"
                  className="orderBtn"
                  onClick={() => {
                    if (turnSort === 'off') {
                      turnSortFunc('on');
                      pdInfosArrFunc([
                        ...pdInfosArr.sort((a, b) => {
                          if (a.name > b.name) return 1;
                          if (a.name < b.name) return -1;
                          if (a.name === b.name) return 0;
                        }),
                      ]);
                    } else {
                      turnSortFunc('off');
                      pdInfosArrFunc([
                        ...pdInfosArr.sort((a, b) => {
                          if (a.PK > b.PK) return 1;
                          if (a.PK < b.PK) return -1;
                          if (a.PK === b.PK) return 0;
                        }),
                      ]);
                    }
                  }}
                >
                  가나다순 정렬
                </Button>
              </div>
              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 3 && num >= 0) {
                      return <PdCol key={num} n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>
              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 6 && num >= 3) {
                      return <PdCol key={num} n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>
              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 9 && num >= 6) {
                      return <PdCol key={num} n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>
              <Container>
                <Row>
                  {pdInfosArr.map((el, num) => {
                    if (num < 12 && num >= 9) {
                      return <PdCol key={num} n={num} pd={el}></PdCol>;
                    }
                  })}
                </Row>
              </Container>
              <button
                //중요: axios와 fetch의 차이
                //axios는 외부라이브러리로 json형태를 모두 object와 array로 변환해줌
                //그러나 fetch는 json그대로 받아오기 때문에 array나 obj으로의 변환이 필요함.
                //fetch변환 코드 -> .then(result => result.json()) .then(data => {})
                // + 복수 요청 보낼때, Promise.all( [axios.get('URL1'), axios.get('URL2')] .then() 프로미스문법 )
                onClick={async () => {
                  setMainChartBtn(mainChartBtn + 1);

                  if (mainChartBtn === 1) {
                    try {
                      const result = await axios.get(
                        'https://codingapple1.github.io/shop/data2.json',
                      );
                      const pdinfo = result.data;
                      console.log(pdinfo);
                      const copy = [...pdInfosArr];

                      pdinfo.map((el, num) => {
                        const newPd = {
                          PK: pdinfo[num].id + 1,
                          name: pdinfo[num].title,
                          describe: pdinfo[num].content,
                          price: pdinfo[num].price,
                        };
                        copy.push(newPd);
                      });
                      console.log(copy);
                      pdInfosArrFunc(copy);
                    } catch (err) {
                      console.error(err);
                      console.log('실패');
                    }
                  }
                  if (mainChartBtn === 2) {
                    try {
                      const result = await axios.get(
                        'https://codingapple1.github.io/shop/data3.json',
                      );
                      const pdinfo = result.data;
                      console.log(pdinfo);
                      const copy = [...pdInfosArr];

                      pdinfo.map((el, num) => {
                        const newPd = {
                          PK: pdinfo[num].id + 1,
                          name: pdinfo[num].title,
                          describe: pdinfo[num].content,
                          price: pdinfo[num].price,
                        };
                        copy.push(newPd);
                      });
                      console.log(copy);
                      pdInfosArrFunc(copy);
                    } catch (err) {
                      console.error(err);
                      console.log('실패');
                    }
                  }
                }}
              >
                버튼
              </button>
              {mainChartBtn}
            </>
          }
        />

        {/* 디테일영역 */}
        <Route
          path="/detail1/:id"
          element={
            //ContextAPI 만들기 2. 공유하고 싶은 state를 value에 넣어준다.
            <Suspense fallback={<div>로딩중임</div>}>
              <Detail1 pdInfos={pdInfosArr}></Detail1>
            </Suspense>
          }
        />

        <Route path="/cart" element={<Cart />} />

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

//컴포넌트 모음

//about페이지 컴포넌트
function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

//event페이지 컴포넌트
function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

//메인페이지 행 반복용 컴포넌트
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
