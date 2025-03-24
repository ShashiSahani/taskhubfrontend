/* eslint-disable no-unused-vars */
import { useState } from "react"

function CalculatorIndex() {
  const [input,setInput]=useState("");

  const handleButtonClick=(value)=>{
    setInput((prevInput) => prevInput + value);
  }
  const handleClear=()=>{
    setInput("");
  }
  const handleCalculate=()=>{
    try {
      setInput(eval(input).toString())
    } catch (error) {
      setInput("Error")
    }
  }
    return (
      <div className="flex justify-center items-center h-screen bg-primary-ligter">
      <div className="bg-primary-light p-6 rounded-lg shadow-lg w-80">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-4 text-2xl text-right border-none focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-md mb-4"
        />
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => handleButtonClick("7")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            7
          </button>
          <button
            onClick={() => handleButtonClick("8")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            8
          </button>
          <button
            onClick={() => handleButtonClick("9")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            9
          </button>
          <button
            onClick={() => handleButtonClick("/")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            ÷
          </button>

          <button
            onClick={() => handleButtonClick("4")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            4
          </button>
          <button
            onClick={() => handleButtonClick("5")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            5
          </button>
          <button
            onClick={() => handleButtonClick("6")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            6
          </button>
          <button
            onClick={() => handleButtonClick("*")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            ×
          </button>

          <button
            onClick={() => handleButtonClick("1")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            1
          </button>
          <button
            onClick={() => handleButtonClick("2")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            2
          </button>
          <button
            onClick={() => handleButtonClick("3")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            3
          </button>
          <button
            onClick={() => handleButtonClick("-")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            −
          </button>

          <button
            onClick={() => handleButtonClick("0")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            0
          </button>
          <button
            onClick={() => handleButtonClick(".")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            .
          </button>
          <button
            onClick={handleClear}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            C
          </button>
          <button
            onClick={() => handleButtonClick("+")}
            className="p-4 text-xl bg-secondary-light rounded-md hover:bg-secondary-dark"
          >
            +
          </button>

          <button
            onClick={handleCalculate}
            className="col-span-4 p-4 text-xl bg-primary-dark text-white rounded-md hover:bg-primary"
          >
            =
          </button>
        </div>
      </div>
    </div>
    )
  }
  
  export default CalculatorIndex
  