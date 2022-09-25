import { useEffect, useState } from 'react';
import './App.css';
const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({output, input}) =>{
  return (
  <div id='display'>
   <span id='output'>{output}</span>
   <span id='input'>{input}</span>
  </div>
  )
}

const Key = ({value, id, handleInput}) =>{
  return(
    <button id={id} onClick={() => handleInput(value)} >{value}</button>
  )
}

const Keyboard =({handleInput}) =>{
  return(
    <div className='keyboardKey'>
    {calcData.map(key =>
      <Key id={key.id} value={key.value} handleInput={handleInput} /> )}
      </div>
  )
}

function App() {
  const [output ,setOutput] = useState('')
  const [input ,setInput] = useState('0')
  const [calcuData, setCalcuData] = useState('')

  const handleClear = () =>{
    setOutput('');
    setInput('0');
    setCalcuData('');
  }
  
  const handleSubmit = () =>{
    const totla = eval(calcuData);
    setInput(`${totla}`);
    setCalcuData(`${totla}`);
  }

  const handleNumber = (value) =>{
    if (!calcuData.length){
      setInput(`${value}`)
      setCalcuData(`${value}`)
    } else{
      if (value === 0 && (calcuData === '0' || input==='0')){
        setCalcuData(`${calcuData}`);
      } else{
        const lastChart = calcuData.charAt(calcuData.length-1);
        const lastChartIsOpera = lastChart === '*' || operators.includes(lastChart) 
        setInput(lastChartIsOpera ? `${value}` : `${input}${value}`);
        setCalcuData(`${calcuData}${value}`)
        
      }
    }
  }
  const handleDot = () =>{
    const lastChart = calcuData.charAt(calcuData.length-1);

    if(!calcuData.length){
      setInput('0.')
      setCalcuData('0.')
    }else {
      if (lastChart === '*' || operators.includes(lastChart)){
        setInput(`0.`)
        setCalcuData(`${calcuData}0.`)
      }else{
        setInput( 
          lastChart === '.' || input.includes('.')
          ? `${input}`
          :`${input}.`
        )
        setCalcuData(
          lastChart === '.' || calcuData.includes('.')
          ? `${calcuData}`
          :`${calcuData}.`
        )
      }
    }}

  const handleOperator = (value) =>{
    const lastChart = calcuData.charAt(calcuData.length -1);
    const lastChartIsOpera = lastChart === '*' || operators.includes(lastChart);

    const beforeLastChart = calcuData.charAt(calcuData.length -2);
    const beforeLastChartIsOpera = beforeLastChart === '*' || operators.includes(beforeLastChart);

    const validOp = value ==='x' ? '*' : `${value}`;

    if(calcuData.length){
      setInput(`${value}`)

      if (lastChartIsOpera && validOp !== '-'
       || beforeLastChartIsOpera && lastChartIsOpera){
        if (beforeLastChartIsOpera){
          console.log(value)
          const updatedValue = `${calcuData.substring(
            0, calcuData.length -2
          )}${validOp}`
          setCalcuData(updatedValue)
        }else{
          const updatedValue = `${calcuData.substring(
            0, calcuData.length -1
          )}${validOp}`
          setCalcuData(updatedValue)
        }
      }else{
        setCalcuData(`${calcuData}${validOp}`)
      }

    }
  }

  const handleInput = (value) =>{
    const number = numbers.find(num => num === value);
    const operator = operators.find(op => op === value);

    switch(value) {
      case 'AC' :
        handleClear();
      break;
      case '=' :
        handleSubmit();
      break;
      case number :
        handleNumber(value);
      break;
      case operator :
        handleOperator(value);
      break;
      case '.' :
        handleDot();
      break;
    }
 
  }

  const hendleOutput = () =>{
    setOutput(calcuData)
  }

  useEffect(() =>{
    hendleOutput()
  }, [calcuData])

  return (
    <div className="calculator">
     <Display input={input} output={output} />
     <Keyboard handleInput={handleInput} />
    </div>
  );
}

export default App;
