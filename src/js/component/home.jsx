import React, { useState } from "react";

//include images into your bundle
import SecondsCounter from "./SimpleCounter";
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

  return (
    // Se puede pasar como seconds como prop para darle un estado inicial al componente, por defecto hace conteo automatico
        <SecondsCounter />
  );
};

export default Home;
