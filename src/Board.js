import React from 'react';
import NumberRow from './components/NumberRow';

/**
 * 
 * @TODO 
 * 
 *  - sayı girildiginde otomatik diger inputa setFocus
 *  - enterToSubmit() - press enter to submit guess
 *  - resetGame() - herhangi bir an oyun tekrar başlatılsın
 *  - clearForm() - submit sonrası guess kutucukları silinsin 
 *  - guessCount() - kaçıncı tahmin sayılsın.
 * 
 */


export default function Board() {

    const digitCount = 4
    const [gameStarted,setGameStarted] = React.useState(false);
    const [randomNumber,setRandomNumber] =  React.useState([]);
    const [liste,setListe] = React.useState([])
    const [formData,setFormData] = React.useState(
        {
            "num_1":"",
            "num_2":"",
            "num_3":"",
            "num_4":""
        }
    )
    
    const guessNumbers = Object.values(formData);
    const allNumbers = guessNumbers.join('').length;

    // test amaçlı true, sonra  bir alt satırı acalım
    const shallGuess = true
    //const shallGuess = allNumbers === digitCount

    const listeElements = liste.map((item,index)=>
        <NumberRow 
                key={index}
                obj={item.obj} 
                txt={item.txt}
        />
    )

    function generateNumber(){
        let i = 0;
        const nums = []
        while(i < digitCount){
            let num = Math.floor(Math.random()*9).toString();
            if(nums.indexOf(num)===-1){
                nums.push(num);
                i++;        
            }
        }
        setRandomNumber(nums);
    }

    function startGame() {
       
        generateNumber();
        setGameStarted(prevGameStarted=>!prevGameStarted);
    }

    function checkExist(){

        let onPlace = 0
        let offPlace = 0;

        guessNumbers.forEach((gn,i)=>{
            let index = randomNumber.indexOf(gn)
            if(index !== -1){
                 index === i ? onPlace++ : offPlace++ 
            }
        })

        let resultString = "";
        if(onPlace)resultString += ` +${onPlace}`;
        if(offPlace)resultString += ` -${offPlace}`;
        if(!offPlace && !onPlace) resultString = "0"
        if(onPlace===digitCount) resultString = "olleeyyy..."
                
        return resultString;
    }

    function submitGuess(event){
        event.preventDefault();
        
        if(allNumbers === digitCount){
            setListe(prevListe=>[
                {
                    obj:formData,
                    txt:checkExist()
                },
                ...prevListe
            ])

           setFormData( {
                "num_1":"",
                "num_2":"",
                "num_3":"",
                "num_4":""
            } )

        }else{
            console.log("you shall not pass")
        }
    }

    function handleChange(event) {
        const {name,value} = event.target
        setFormData(prevFormData=>{
            return({
                ...prevFormData,
                [name] : value
            })
        })
          
        //value.replace(/\D/g, '')

    }

    return(

        <div className="board">

            <div className="board--head">
                {(!gameStarted)
                    ? <button onClick={startGame}>Start</button>
                    : <label>{randomNumber}</label>
                }
            </div>

            <div className="row" hidden={!gameStarted}>
             <form className="form" 
                    onSubmit={submitGuess} 
                >
                <input 
                        type="text"
                        name ="num_1" 
                        maxLength="1"
                        value={formData.num_1}
                        onChange={handleChange}
                    />
                <input type="text" 
                        name ="num_2"
                        maxLength="1"  
                        value={formData.num_2}
                        onChange={handleChange}
                    />
                <input type="text"
                        maxLength="1" 
                        name ="num_3" 
                        value={formData.num_3}
                        onChange={handleChange}
                    />
                <input type="text" 
                        name ="num_4" 
                        maxLength="1" 
                        value={formData.num_4}
                        onChange={handleChange}
                    />
                 {shallGuess && <button>GUESS</button>} 
              </form>
<div>


</div>

            </div>

            <div className="row"> 
                {listeElements}
            </div>
            
        </div>
    )
}