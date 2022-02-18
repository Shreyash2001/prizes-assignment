import React from 'react'
import Card from './Card';
import "./Winner.css"

function Winner({winners}) {
  return (
    <div>
        <div className="winner__category">

        {
            winners?.map((winner) => (
            winner?.laureates?.map((laureate) => (
                <Card key={laureate?.id} data={laureate} />
            ))
            ))
        }
        </div>
    </div>
  )
}

export default Winner