import React from "react";
import "./App.css";
import "./button.css";
import Docs from "./Docs";
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <div className="title">
        <h1 className="title">
          LDE <span className="dash">&ndash;</span>
        </h1>
      </div>
      <div className="about">
        На нашей платформе собраны все необходимые инструменты для эмуляции систем,
        <br />
        изучения алгоритмов и профессиональной работы.
        <br />
        Мы объединяем удобство и функциональность,
        <br />
        чтобы помочь вам решать задачи любого уровня сложности.
      </div>
      <div className="button1">
        <Link to="/linuxemulation">
          <button>Эмулировать Linux</button>
        </Link>
      </div>
      <div className="button2">
        <Limk to="/AlgorithmPage">
          <button>Эмулировать алгоритмы</button>
        </Limk>
      </div>
      <div className='docs'>
        <Link to="/docs">
          <button>DOCS</button>
        </Link>
      </div>
    </div>
  );
}

export default App;