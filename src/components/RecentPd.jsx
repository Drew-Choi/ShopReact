/* eslint-disable no-unused-vars */
import { useState } from "react";
import './recentPd.css';

export default function RecentPd({pdInfosArr, getWatched}) {

  const [watchedList, setWatchedList] = useState(getWatched)

  const deleteRecentList = (el) => {
    let copy = [...watchedList]
    let finderIndex = copy.findIndex((e) => e === el)
    copy.splice(finderIndex, 1)
    localStorage.setItem("watched", JSON.stringify(copy))
    setWatchedList(copy)
  }

  return (
   <>
     <div className="recentMenu_container">
      <h6>최근 본 상품</h6>
      { watchedList.map((el, index) => {
        let finder = pdInfosArr.find((e) => e.PK === el)
        return(
        <div key={index}>
          <span onClick={()=> deleteRecentList(el)} className="material-symbols-outlined">close</span>
          <img style={{display: "block"}} src={'https://codingapple1.github.io/shop/shoes' + el + '.jpg'} alt="img" width="100" />
          <h6>{finder.name}</h6>
          <p>{finder.price}</p>
        </div>   
        )
      })
      }
     </div>
   </>
  )
}