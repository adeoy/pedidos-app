import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Badge,
} from "reactstrap";

const Platillo = (props) => {
  const { data } = props;

  const handleOnClick = (_id, extras) => {
    console.log(_id);
    console.log(extras);
  };

  return (
    <Card onClick={() => handleOnClick(data._id, data.extras)}>
      <CardImg top width="100%" src={data.picture} alt="Card image cap" />
      <CardBody>
        <CardTitle>
          <h5>{data.name}</h5>
        </CardTitle>
        <CardText>
          <small>{data.description}</small>
          <br />
          <Badge color="info">
            {data.time_ready.min} - {data.time_ready.max}
          </Badge>{" "}
          - <Badge color="success">Precio ${data.price}</Badge>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default Platillo;
