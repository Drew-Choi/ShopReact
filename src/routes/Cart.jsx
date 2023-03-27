import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setUserAge } from "../store/userSlice.js";
import { setAddCount, setMinorCount } from "../store/cartDataSlice";

function Cart() {

  let redux = useSelector((state) => state );
  let cartData = redux.cartData;
  //state변경을 위해서 store.js에게 요청을 보내주는 함수
  let dispatch = useDispatch();

  return (
    <div>
      <h4 style={{textAlign: "center"}}>{redux.user.name}(나이: {redux.user.age})의 장바구니</h4>
      <button onClick={() => {
        //useDispatch를 사용해서 변수에 담고
        //그 함수에 store에서 불러낸 setUser를 담아준다.
        //그래야 setUser를 사용 할 수 있다.
        dispatch(setUserAge(1))
      }}>나이 +1 올리기</button>

      <button onClick={() => {
        //useDispatch를 사용해서 변수에 담고
        //그 함수에 store에서 불러낸 setUser를 담아준다.
        //그래야 setUser를 사용 할 수 있다.
        dispatch(setUserAge(5))
      }}>나이 +5 올리기</button>

      <button onClick={() => {
        //useDispatch를 사용해서 변수에 담고
        //그 함수에 store에서 불러낸 setUser를 담아준다.
        //그래야 setUser를 사용 할 수 있다.
        dispatch(setUserName())
      }}>이름 바꾸기</button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cartData.map((el, num) => 
            cartData[num].count <= 0 ?
            null
            :
            <tr key={num}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.count}</td>
              <td>
                <button onClick={()=> {
                  dispatch(setAddCount(num))
                }}>+</button>
                <button onClick={()=> {
                  dispatch(setMinorCount(num))
                }}>-</button>
              </td>
            </tr>
           )
          }
          
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart;