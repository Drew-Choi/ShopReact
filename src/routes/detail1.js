/* eslint-disable jsx-a11y/alt-text */

import { useParams, Link } from 'react-router-dom';

function Detail1(props) {
  let { id } = useParams();
  if (id <= props.pdInfos.length && id > 0) {
    let idFinder = props.pdInfos.find((e) => e.PK === Number(id));
    console.log(idFinder);
    return (
      <div className="container">
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
