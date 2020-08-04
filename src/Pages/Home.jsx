import React from 'react';
import { Container } from "reactstrap";
import Platillos from "../Components/Platillos";

export default function Home() {
  return (
    <Container>

      <header className="mt-2 mb-4">
        <h1 className="text-center">
          Pedidos App
      </h1>
      </header>

      <Platillos />

    </Container>
  )
}
