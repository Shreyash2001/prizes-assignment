import React from 'react';
import "./SpecialWinner.css";

function SpecialWinner({data}) {
  return (
    <div className="specialwinner">
        {data?.map((val) => (
            (val?.startsWith("F") || val?.startsWith("J") || val?.startsWith("L") || val?.startsWith("M")) &&
            <div>
                <h1 className="specialwinner_names">{val}</h1>
            </div>
        ))}
        
    </div>
  )
};

export default SpecialWinner