import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faArrowsRotate, faArrowsUpToLine} from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types";

const SecondsCounter = ({ seconds = 0 }) => {
  const [time, setTime] = useState(seconds); // Estado para el tiempo
  const [isCountingDown, setIsCountingDown] = useState(seconds > 0); // Estado para saber si contar hacia atrás
  const [isPaused, setIsPaused] = useState(false); // El estado para determinar si está pausado el contador
  const [inputValue, setInputValue] = useState(""); // El valor del input

  useEffect(() => {
    if (isPaused) return;
    let timer;

    if (isCountingDown && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isCountingDown) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (isCountingDown && time === 0) {
      alert("Tu contador ha finalizado");
      setIsCountingDown(false);
    }
    // Limpiar el intervalo cuando el tiempo llegue a 0 o se detenga la cuenta
    return () => clearInterval(timer);
  }, [time, isCountingDown, isPaused]);

  // Convierte el tiempo a array de caracteres con padding
  const slots = time.toString().padStart(6, "0").split("");

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex align-items-center gap-4 justify-content-center p-4"
        style={{ display: "flex", height: "30%", background: "black" }}
      >
        <Card width="13vw" clockSize="80%" />
        {slots.map((slot, index) => (
          <Card key={index} value={slot} />
        ))}
      </div>
      <div className="d-flex flex-column align-items-center mt-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ingresa un número"
          className="form-control w-25 mb-3"
        />
        <div className="btn-group">
          <a
            href="#"
            onClick={(e) => {
              if (!isNaN(parseInt(inputValue))) {
                setTime(parseInt(inputValue));
                setIsCountingDown(true);
              } else {
                alert("Error, valor invalido (Solo Numeros)");
              }
            }}
            className="btn btn-success"
          >
            <FontAwesomeIcon icon={faArrowsUpToLine} />

          </a>
          <a
            onClick={() => {
              setIsPaused(true);
            }}
            className="btn btn-warning"
          >
            <FontAwesomeIcon icon={faPause} />
          </a>
          <a
            onClick={() => {
              setIsPaused(false);
            }}
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faPlay} />

          </a>
          <a
            onClick={() => {
              setTime(0);
              if (isCountingDown || isPaused) {
                setIsCountingDown(seconds > 0);
                setIsPaused(false);
                
              }
            }}
            className="btn btn-danger"
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </a>
        </div>
      </div>
    </div>
  );
};

SecondsCounter.propTypes= {
  seconds: PropTypes.number
}

export default SecondsCounter;
