import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  //리덕스에서 stat변경 방법 스텝 1. reducers키를 만들어라
  //그리고 그 안에 작명하고 함수 하나 만들어라
  reducers: {
    setUserName(state) {
      state.name = 'Choi';
      //만약 바꿔치기가 아닌 추가로 하고 싶으면 setUser(state){}
      //이렇게 매개변수 안에 state를 넣어주고 return ['john kim' + state] 이렇게 해준다.
      //state매개변수는 기존 ['kim', 'park']을 유지한 것이고, 거기에 새로운 'john kim'을 넣어주는 것이다.
    },
    setUserAge(state, action) {
      //"action"는 인자, 인자 받아 쓸때는 .payload를 꼭 써줘야 한다.
      //매개변수는 action이라고 통상적으로 표현함
      state.age += action.payload;
    },
  },
});
//setUser를 밖으로 빼내기, 구조분해할당으로 빼줌
export let { setUserName, setUserAge } = user.actions;

export default user;
