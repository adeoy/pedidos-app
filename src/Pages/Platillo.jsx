import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import Loader from 'react-loader-spinner';

const Platillo = ({ history, addToCart, match }) => {
  const _id = match.params._id;
  const [qty, setQty] = useState(1);
  const [platillo, setPlatillo] = useState(null);
  const [extras, setExtras] = useState({});

  useEffect(() => {
    fetch(`https://visitame.herokuapp.com/orders/platillos/get/${_id}`)
      .then(resp => resp.json())
      .then(resp => {
        setPlatillo(resp);
        let extras = {};
        for (let i = 0; i < resp.extras.length; i++) {
          const extra = resp.extras[i];
          extras[extra.name] = 0;
        }
        setExtras(extras);
      })
  }, [_id]);

  const getTotalComplementos = () => {
    const data = Object.entries(extras);
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      const [name, qty] = data[i];
      total += findPrecioExtra(name) * qty;
    }
    return total;
  }

  const findPrecioExtra = (name) => {
    for (let j = 0; j < platillo.extras.length; j++) {
      const extra = platillo.extras[j];
      if (extra.name === name) {
        return extra.price;
      }
    }
    return 0;
  }

  const handleAddToCart = () => {
    const data = Object.entries(extras);
    const extrasElegidos = [];
    for (let i = 0; i < data.length; i++) {
      const [name, qty] = data[i];
      if (qty > 0) {
        const total = findPrecioExtra(name) * qty;
        extrasElegidos.push({ name, qty, total });
      }
    }
    const totalPlatillo = qty * platillo.price;
    const totalComplementos = getTotalComplementos();
    addToCart({
      ...platillo,
      ...{
        extrasElegidos,
        qty,
        totalPlatillo,
        totalComplementos,
        total: totalPlatillo + totalComplementos
      }
    })
  }

  const renderPlatillo = () => {
    if (!platillo) {
      return (
        <div className="text-center">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      )
    } else {
      const totalPlatillo = qty * platillo.price;
      const totalComplementos = getTotalComplementos();
      const total = totalPlatillo + totalComplementos;
      return (
        <div className="mb-4">
          <Row className="mb-3 d-none d-lg-block d-xl-block">
            <Col>
              <h2>{platillo.name}</h2>
            </Col>
          </Row>

          <Row>
            <Col xs="12" lg="6">
              <img className="img-fluid rounded" src={platillo.picture} alt={platillo.name} />
              <div className="mt-3 d-xs-block d-sm-block d-md-block d-lg-none d-xl-none ">
                <h2>{platillo.name}</h2>
              </div>
            </Col>
            <Col xs="12" lg="6">
              <Badge color="secondary">{platillo.category}</Badge>
              <p>
                {platillo.description} <br />
                <small style={{ color: "darkslategray" }}>Tiempo aproximado de entrega: {platillo.time_ready.min} - {platillo.time_ready.max}</small>
              </p>

              <h4 className="mt-2">Precio ${platillo.price} MXN c/u</h4>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button style={{ minWidth: "80px" }} onClick={() => (qty > 1) ? setQty(qty - 1) : null} disabled={qty === 1}>-</Button>
                </InputGroupAddon>
                <Input value={qty} disabled />
                <InputGroupAddon addonType="append">
                  <Button style={{ minWidth: "80px" }} onClick={() => setQty(qty + 1)} disabled={qty >= 10}>+</Button>
                </InputGroupAddon>
              </InputGroup>

              <h5 className="mt-4">¿Algo más?</h5>
              {platillo.extras.map((extra, i) => {
                const key = extra.name;
                const qty = extras[key];
                const nuevo = {};

                return (
                  <div key={i} className="mt-4">
                    <p>{extra.name} por sólo ${extra.price}MXN c/u</p>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button style={{ minWidth: "80px" }} onClick={() => {
                          const nuevo = {};
                          nuevo[key] = qty - 1;
                          return (qty > 0) ? setExtras({ ...extras, ...nuevo }) : null
                        }}
                          disabled={qty === 0}>-</Button>
                      </InputGroupAddon>
                      <Input value={qty} disabled />
                      <InputGroupAddon addonType="append">
                        <Button style={{ minWidth: "80px" }} onClick={() => {
                          nuevo[key] = qty + 1;
                          return (qty < 10) ? setExtras({ ...extras, ...nuevo }) : null
                        }}
                          disabled={qty >= 10}>+</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                )
              })}

              <div className="text-right mt-4">
                <h5>Total de platillos: ${totalPlatillo}MXN</h5>
                <h5>Total de complementos: ${totalComplementos}MXN</h5>
                <h5><strong>Total: ${total}MXN</strong></h5>
              </div>

              <div className="text-center mt-4">
                <Button color='primary' style={{ minWidth: "160px" }} onClick={handleAddToCart}>Ordenar</Button>
              </div>

            </Col>
          </Row>
        </div>
      );
    }
  }

  return (
    <Container>
      <br />
      <br />
      <br />
      <main>

        <Button tag={Link} to="/" className="mb-4"><span role='img' aria-label='emoji'>⬅️</span> Volver</Button>

        {renderPlatillo()}
      </main>

    </Container>
  )
}

export default withRouter(Platillo);