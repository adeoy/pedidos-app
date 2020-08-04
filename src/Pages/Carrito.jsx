import React from 'react'
import { Container, Button, Row, Col, Card, CardTitle, CardText, CardFooter, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Carrito({ cart, removeFromCart }) {

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="text-center">
          <p>Tu carrito esta vacío, prueba a elegir algo de nuestro menú</p>
        </div>
      );
    }
    return (
      <Row>
        {cart.map(item => (
          <Col xs="12" sm="6" md="4" lg="3" key={item._id}>
            <Card>
              <CardHeader>{item.name}</CardHeader>
              <CardBody>
                <div>

                </div>
                <div className="text-right">
                  <Button color='danger' onClick={() => removeFromCart(item._id)}>Eliminar</Button>
                </div>
              </CardBody>
              <CardFooter>Total ${item.total} MXN</CardFooter>
            </Card>

          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Container>
      <br />
      <br />
      <br />
      <main>

        <Button tag={Link} to="/" className="mb-4"><span role='img' aria-label='emoji'>⬅️</span> Volver</Button>

        {renderCart()}

      </main>

    </Container>
  )
}
