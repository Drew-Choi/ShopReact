/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'

export default function UseMemoChild() {
  const [count, setCount] = useState(true)

  useMemo(() => {
    for(let i = 0; i < 1000; i += 1){
      console.log("유즈메모 자식 랜더링 중");
    }
  },[count])
  
  return (
    <>
     <div>UseMemoChild</div>
     <button onClick={()=> setCount((cur)=> !cur)}>자식 버튼</button>
    </>
  )
}
