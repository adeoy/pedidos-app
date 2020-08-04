import React, { useState, useEffect } from "react";

import {
  Row,
  Col
} from "reactstrap";

import Platillo from './Platillo';
import Loader from "react-loader-spinner";


const Platillos = () => {
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    fetch('https://visitame.herokuapp.com/orders/platillos/get')
      .then(resp => resp.json())
      .then(resp => {
        setPlatillos(resp);
      });
  }, []);

  const renderPlatillos = () => {
    if (platillos.length === 0) {
      return (
        <Col xs="12" className="mb-3 text-center">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </Col>
      )
    }
    return platillos.map((platillo, idx) => (
      <Col xs="12" sm="6" md="4" lg="3" key={idx} className="mb-3">
        <Platillo data={platillo} />
      </Col>
    ));
  }

  return (
    <section>
      <Row className="mb-2">
        <Col xs="12">
          <h3>Platillos</h3>
        </Col>
      </Row>
      <Row>
        {renderPlatillos()}
      </Row>
    </section>
  );
};

export default Platillos;
