import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Card, Button} from 'react-bootstrap';
import './Home.css';

  
function Home() {
  return (

<div class="Information">
  
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

  <Tab eventKey="home" title="Boggle">
    <Card className="text-center">
        
  
  <Card.Body>
    <Card.Header><h3>Explicacion</h3></Card.Header>
    <br/>
    <Card.Text>
    Es un tablero con una combinación única de letras. Los participantes tiene ciertas vidas para formar el máximo de palabras posible. Cada palabra tiene que estar formada por dados adyacentes. No se permiten prefijos, argot ni siglas pero sí cualquier forma verbal o plurales. Las palabras repetidas entre los diversos jugadores no puntúan. Cada judaro tiene un puntaje. No hay límite de jugadores posibles por equipos.
    </Card.Text>
  </Card.Body>

</Card>

  </Tab>
  <Tab eventKey="profile" title="Solo"> 
  <Card className="text-center">
  
  
  <Card.Header><h3>Solo</h3></Card.Header>
    <br/>
  <Card.Body>
    <Card.Text>
        Juega Tu solo y prueba tus habilidades    </Card.Text>
    <Button variant="primary" href="/Solo">Jugar Solo</Button>
    
  </Card.Body>
  </Card>
  </Tab>
  <Tab eventKey="contact" title="Equipos">
  <Card className="text-center">    
  
  <Card.Header><h3>Equipos</h3></Card.Header>
    <br/>
  <Card.Body>
    <Card.Text>
        Compite para ver que equipo es mejor     </Card.Text>
    
    <Button variant="primary" href="/Team">Jugar Equipos</Button>
  </Card.Body>
  </Card>
  </Tab>
  
</Tabs>
</div>
    


  );
}
export default Home;