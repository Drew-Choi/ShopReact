/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { pushCartData } from '../store/cartDataSlice';
import Cart from './Cart';
//ContextAPI 만들기 3.임폴트하기
// import { Context1 } from '../App.js';

//스타일드 컴퍼넌트 활용 코드
// import styled from 'styled-components';

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg === 'blue' ? 'white' : 'black')};
//   padding: 10px;
// `;

function Detail1(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let cartData = state.cartData;
  //ContextAPI 만들기 3. 쓰고 싶은 컴포넌트에서 임폴트하기
  //구조분해할당도 가능
  // let { 재고, pdInfosArr } = useContext(Context1);
  // let appStateArr = useContext(Context1);

  let [eventSecond, setEventSecond] = useState('on');
  let [count, setCount] = useState(0);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEventSecond('off');
  //   }, 3000);
  //   console.log(1);
  // }, [count]);
  //useEffect 마지막에 count를 넣어준 이유는 count가 변화가 있을 때 마다 이펙트를 실행해 주는 설정
  //[]긴걸 넣어주면 1번만 실행하고 그 다음에는 안됨

  useEffect(() => {
    let timer = setTimeout(() => {
      setEventSecond('off');
    }, 3000);
    return () => {
      // useEffect 로드 전에 기존타이머는 제거해주세요~~
      clearTimeout(timer);
    };
  }, []);
  //이렇게 리턴도 줄 수 있음.
  //return에 들어간 기능은 useEffect 동작 전에 실행되는 것
  //ex) clean up function 사용할때 쓰임

  let { id } = useParams();
  if (id <= props.pdInfos.length && id > 0) {
    let idFinder = props.pdInfos.find((e) => e.PK === Number(id));

    useEffect(() => {
      let fadeTime = setTimeout(() => {
        setFade2('end');
      }, 10);

      return () => {
        clearTimeout(fadeTime);
        setFade2('');
      };
    }, []);

    //HTML쪽으로 리턴하는 것
    return (
      <div className={'container start ' + fade2}>
        {eventSecond === 'on' ? (
          <div className="alert alert-warning">3초이내 구매시 할인</div>
        ) : null}

        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          버튼
        </button>
        {/* <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn> */}
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                'https://codingapple1.github.io/shop/shoes' +
                idFinder.PK +
                '.jpg'
              }
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{idFinder.name}</h4>
            <p>{idFinder.describe}</p>
            <p>{idFinder.price} ₩ </p>
            <button
              className="btn btn-danger"
              onClick={() => {
                let newCartData = {
                  id: cartData.length + 1,
                  name: idFinder.name,
                  count: 1,
                };
              }}
            >
              주문하기
            </button>
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(0);
              }}
              eventKey="link0"
            >
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(1);
              }}
              eventKey="link1"
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(2);
              }}
              eventKey="link2"
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tab={tab}></TabContent>
      </div>
    );
  } else {
    return (
      <>
        <h4>빈 페이지</h4>
        <br></br>
        <Link to="/">돌아가기</Link>
      </>
    );
  }
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');
  //ContextAPI는 사용하는 컴퍼넌트마다 useContext를 적용해줘야함
  // let { 재고, pdInfosArr } = useContext(Context1);

  useEffect(() => {
    let times = setTimeout(() => {
      setFade('end');
    }, 10);
    return () => {
      clearTimeout(times);
      setFade('');
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {
        [
          <div>
            <Cart />
          </div>,
          <div>내용1</div>,
          <div>내용2</div>,
        ][tab]
      }
    </div>
  );
}

export default Detail1;
