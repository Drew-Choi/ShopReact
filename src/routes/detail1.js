/* eslint-disable jsx-a11y/alt-text */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

//스타일드 컴퍼넌트 활용 코드
// import styled from 'styled-components';

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg === 'blue' ? 'white' : 'black')};
//   padding: 10px;
// `;

function Detail1(props) {
  let [eventSecond, setEventSecond] = useState('on');
  let [count, setCount] = useState(0);

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

    //HTML쪽으로 리턴하는 것
    return (
      <div className="container">
        {eventSecond === 'on' ? (
          <div className="alert alert-warning">3초이내 구매시 할인</div>
        ) : null}
        {count}
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
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
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

export default Detail1;
