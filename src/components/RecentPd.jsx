import { useState } from "react";
import './recentPd.css';

export default function RecentPd() {

  const [recentArr] = useState([])

    for(let i = 0; i < localStorage.length; i += 1){
      let localFindKey = localStorage.key(i);
      let localGetItem = localStorage.getItem(localFindKey);
      let localGetItemParse = JSON.parse(localGetItem);
      recentArr.push(localGetItemParse);
      
    }
    console.log(recentArr);
  return (
   <>
     <div className="recentMenu_container">
      <h6>최근 본 상품</h6>
      { recentArr.map((el, index) => {
        return(
        <div key={index}>
          <span className="material-symbols-outlined">close</span>
          <img style={{display: "block"}} src={'https://codingapple1.github.io/shop/shoes' + el.PK + '.jpg'} alt="img" width="100" />
          <h6>{el.name}</h6>
          <p>{el.price}</p>
        </div>   
        )
      })
      }
     </div>
   </>
  )
}