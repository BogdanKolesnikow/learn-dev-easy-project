import React from 'react';
import './Flowchart.css'; // Подключаем CSS для блок-схемы

function Flowchart() {
  return (
    <div className="flowchart-wrapper">
      <div className="flowchart-container">
        <div className="flowchart-block start">
          <div className="block-content">команда 1</div>
        </div>
        <div className="flowchart-arrow"></div>
        <div className="flowchart-block ls">
          <div className="block-content">команда 2</div>
        </div>
        <div className="flowchart-arrow"></div>
        <div className="flowchart-block pwd">
          <div className="block-content">команда 3</div>
        </div>
        <div className="flowchart-arrow"></div>
        <div className="flowchart-block echo">
          <div className="block-content">команда 4</div>
        </div>
        <div className="flowchart-arrow"></div>
        <div className="flowchart-block end">
          <div className="block-content">команда 5</div>
        </div>
      </div>
    </div>
  );
}

export default Flowchart;
