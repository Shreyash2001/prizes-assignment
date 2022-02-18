import React, { useState } from 'react'
import "./Card.css";

function Card({data}) {
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show);
    }
  return (
    <div onClick={handleClick} className={`${show ? "big_card" : "card"}`}>
    <div className="card__heading">
        {data?.firstname !== undefined && 
        <h1 className="card__info">
            {data?.firstname}
        </h1>
        }
        {data?.surname !== undefined &&
            <h1 className="card__info">
            {data?.surname}
        </h1>
        }
    </div>

    {show && <div>
        {data?.motivation !== undefined
        &&
        <span className="card__motivation">{"Motivation : " + data?.motivation}</span>
        }
    </div>}

    </div>
  )
};

export default Card