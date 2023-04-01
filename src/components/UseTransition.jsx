/* eslint-disable no-unused-vars */
import React, { useState, useTransition } from 'react'

export default function UseTransition() {

  const [name, setName] = useState('')
  const [isPending, startTransition] = useTransition()

  const arr = new Array(10000).fill(0)

  return (
    <div>
      <input onChange={(e)=>{
        //useTransition에서 startTransition은
        //해당 되는 코드의 시작 시점을 조금 뒤로 미루어 다른 복잡한 일들을 처리한 후 실행하게 만든다.
        startTransition(() => {
          setName((cur)=> e.target.value)
        })
        }} />
      {  
        //useTransition에서 isPending은 작업 중일때 true를 반환함
        //그래서 아래와 같이 작업 중일때 로딩중이라는 글짜를 띄울 수 있다.
        isPending ? '로딩 중' :
        arr.map((el, index)=> {
          return <div key={index}>{name}</div>
        })
      }
    </div>
  )
}
