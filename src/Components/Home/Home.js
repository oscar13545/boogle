import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button} from 'react-bootstrap';
import './Home.css';

  
function Home() {
  return (

    <div class="Information">
    <Card className="text-center">
        
  <Card.Header><h3>Boggle</h3></Card.Header>
  <Card.Body>
    <Card.Title><h4>Explicacion</h4></Card.Title>
    <Card.Text>
    Es un tablero con una combinación única de letras. Los participantes tiene ciertas vidas para formar el máximo de palabras posible. Cada palabra tiene que estar formada por dados adyacentes. No se permiten prefijos, argot ni siglas pero sí cualquier forma verbal o plurales. Las palabras repetidas entre los diversos jugadores no puntúan. Cada judaro tiene un puntaje. No hay límite de jugadores posibles por equipos.
    </Card.Text>
  </Card.Body>
  <Card.Body>
  <Card.Title><h4>Solo</h4></Card.Title>
    <Card.Text>
        Juega Tu solo y prueba tus habilidades    </Card.Text>
    <Button variant="primary" href="/Solo">Jugar Solo</Button>
    
  </Card.Body>
  <Card.Body>
  <Card.Title><h4>Equipos</h4></Card.Title>
    <Card.Text>
        Compite para ver que equipo es mejor     </Card.Text>
    
    <Button variant="primary" href="/Team">Jugar Equipos</Button>
  </Card.Body>
</Card>
</div>
    
  );
}
export default Home;