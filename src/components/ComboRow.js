import React from 'react'

export default function ComboRow() {
    

    const[comboData,setComboData] = {

        "cb_1":""

    }


    function handleChange(event){
        event.preventDefault();
        
        const {value,name} = event.target

        
    }

    return(

        <form>

        <select id="cb_1"
            className='selectBox'
            value={comboData.num1}
            onChange={handleChange}
            name="cb_1"
                >
                <option value="">-</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>

        </form>

    )
}