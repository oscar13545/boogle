import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Card, Button, Image} from 'react-bootstrap';
import './Home.css';
import Tablero from  './Tablero.png'; 

  
function Home() {
  return (

<div class="Information">
  
<Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">

  <Tab eventKey="home" title="Boggle">
    <Card className="text-center">
        
  
  <Card.Body>
    <Card.Header><h3>Explicacion</h3></Card.Header>
    <br/>
    <Card.Text>
    Es un tablero con una combinación única de letras y los participantes tienen ciertas vidas para formar el máximo de palabras posible, el tablero es el siguiente:
<br/><Image src={Tablero} rounded /><br/>
Cada palabra tiene que estar formada por dados adyacentes, no se permiten prefijos, argot ni siglas pero sí cualquier forma verbal o plurales y as palabras repetidas entre los diversos jugadores no puntúan, cada jugador tiene un puntaje dado y mientras mas larga sea la palabra más es el puntaje recibido y no hay límite de jugadores posibles por equipos.
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
    Este modo de juego consiste en que una sola persona busca en el tablero la mayor combinación de letras que formen palabras, los puntos serán comparados con anteriores intentos, crees que puedas tener un valor máximo.    </Card.Text>
    <Button variant="info" href="/Solo">Jugar Solo</Button>
    
  </Card.Body>
  </Card>
  </Tab>
  <Tab eventKey="contact" title="Equipos">
  <Card className="text-center">    
  
  <Card.Header><h3>Equipos</h3></Card.Header>
    <br/>
  <Card.Body>
    <Card.Text>
    Juega con tus amigos para prueba quien tiene mejores habilidades con el boggle, cada equipo tiene su puntaje y al final se mostrar quien hizo el mayor puntaje </Card.Text>
    
    <Button variant="info" href="/Team">Jugar en equipos</Button>
  </Card.Body>
  </Card>
  </Tab>
  
</Tabs>
</div>
    


  );
}
export default Home;