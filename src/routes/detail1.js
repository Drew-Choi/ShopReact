/* eslint-disable jsx-a11y/alt-text */

import { useParams } from 'react-router-dom';

function Detail1(props) {
  let { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={'https://codingapple1.github.io/shop/shoes' + id + '.jpg'}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.pdInfos[id - 1].name}</h4>
          <p>{props.pdInfos[id - 1].describe}</p>
          <p>{props.pdInfos[id - 1].price} ₩ </p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail1;
