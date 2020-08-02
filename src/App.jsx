import React from "react";
import { Container, Row, Col } from "reactstrap";

import Platillo from "./Components/Platillo";

import platillo from "./data/platillo.json";

function App() {
  return (
    <main>
      <Container>
        <Row>
          <Col xs="12" sm="6" md="4">
            <Platillo data={platillo} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
