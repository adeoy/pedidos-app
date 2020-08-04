import React from "react";
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Badge,
  Row,
  Col,
} from "reactstrap";

import './Platillo.css';

const Platillo = ({ history, data }) => {
  const handleOnClick = () => {
    history.push(`/platillo/${data._id}`);
  };

  return (
    <Card
      className="card-pedido shadow-lg"
      style={{ cursor: "pointer" }}
      onClick={handleOnClick}>
      <CardImg top width="100%" src={data.picture} alt={data.name} />
      <CardBody>
        <CardTitle>
          <h4>{data.name}</h4>
        </CardTitle>
        <div>
          <Row>
            <Col xs="12">
              <span style={{
                fontSize: "1.25rem",
                color: "#000065"
              }}>${data.price} MXN</span>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <small style={{ color: "darkslategray" }}><em>{data.category}</em> - {data.description}</small>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="text-right">
              <Badge color="info">
                <span role="img" aria-label="emoji">⏱️</span> {data.time_ready.min} - {data.time_ready.max}
              </Badge>{" "}
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default withRouter(Platillo);
