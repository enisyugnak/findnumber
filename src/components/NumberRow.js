import React from 'react'

export default function NumberRow(props) {

    const {obj,txt} = props;
    const arr = Object.values(obj);
    //  convert object to array
    const row = arr.map((digit,i)=><div key={i}>{digit}</div>);
    
    return(
        <div className='numRow'>
            {row}
            <label>{txt}</label>
        </div>

    )
}