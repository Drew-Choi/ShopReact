import {React, memo} from 'react'

//memo는 특별한 상황에서 재랜더링을 해주는 것으로, 그 특별한 상황은
//memo에게는 프롭스로 전달되는 값이다.
const MemoChild = memo(
  () => {

    for(let i = 0; i < 1000; i += 1){
      console.log("자식랜더링가동");
    }

    return (
      <>
       <div>자식임 프롭스임</div>
      </>
    )
  }
)
  

export default MemoChild
