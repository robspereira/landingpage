import React from "react";

export const Services = (props) => {
 
  for(let i=0; i<5; i++){

  }
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Nosso Serviço</h2>
          <p>
          Transformando Ideias em Experiências Digitais Inesquecíveis!
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
