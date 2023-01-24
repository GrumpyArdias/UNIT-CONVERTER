import React, { useState } from "react";
import { calculator, invertCalculator } from "./calculator";

function Card() {
  const [userInput, setUserInput] = useState("");
  const [userChoice, setUserChoice] = useState("km");
  const [isInverted, setIsInverted] = useState(false);
  const [savedConversions, setSavedConversions] = useState([]);

  const options = [
    { from: "Km", to: "Millas", value: "km" },
    { from: "Metros", to: "Pies", value: "m" },
    { from: "Cm", to: "Pulgadas", value: "cm" },
  ];

  const result = isInverted
    ? invertCalculator(userChoice, parseFloat(userInput))
    : calculator(userChoice, parseFloat(userInput));

  const handleSaveConversions = () => {
    setSavedConversions([
      ...savedConversions,
      {
        id: Math.floor(Math.random() * 100),
        userInput: parseInt(userInput).toFixed(2),
        inputUnit: isInverted
          ? options.find((o) => o.value === userChoice)?.to
          : options.find((o) => o.value === userChoice)?.from,
        result: result.toFixed(2),
        resultUnit: isInverted
          ? options.find((o) => o.value === userChoice)?.from
          : options.find((o) => o.value === userChoice)?.to,
      },
    ]);
  };

  const handleDelete = (id) => {
    const newConversionsArr = savedConversions.filter((c) => c.id !== id);
    setSavedConversions(newConversionsArr);
  };

  console.log(savedConversions);

  return (
    <>
      <div className="header">
        <h1 className="main">Unit Converter</h1>
      </div>
      <div className="main">
        <div className="conversor">
          <h2>Convert</h2>
          <div className="flex">
            <div className="left">
              <div className="topLeft">
                <select
                  value={userChoice}
                  onChange={(e) => setUserChoice(e.target.value)}
                >
                  {options.map((option, i) => {
                    return (
                      <option value={option.value} key={i}>
                        {isInverted ? (
                          <>
                            {option.to} - {option.from}
                          </>
                        ) : (
                          <>
                            {option.from} - {option.to}
                          </>
                        )}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="changeButton"
                  type="button"
                  onClick={() => {
                    setIsInverted(!isInverted);
                    setUserInput(result);
                  }}
                >
                  {isInverted ? "<-" : "->"}
                </button>
              </div>
              <div className="bottonLeft">
                <button
                  className="saveButton"
                  type="button"
                  onClick={handleSaveConversions}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="right">
              <div className="topRight">
                <form>
                  <label></label>
                  <input
                    className="inputText"
                    id="input"
                    type="text"
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput ? parseFloat(userInput).toFixed(2) : ""}
                  />
                </form>
              </div>
              <div className="bottomRight">
                {!result ? null : (
                  <div className="result">
                    {result.toFixed(2)}
                    {isInverted
                      ? options.find((o) => o.value === userChoice)?.from
                      : options.find((o) => o.value === userChoice)?.to}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="saved">
          <h2>saved</h2>

          <div className="savedWrap">
            {savedConversions.map((c) => {
              return (
                <div className="savedConversion" key={c.id}>
                  {c.userInput} {c.inputUnit} - {c.result} {c.resultUnit}
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(c.id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
