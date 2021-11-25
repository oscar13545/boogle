import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container} from 'react-bootstrap';

const Nvbar = (props) => {
    return (
     
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
    
  <Navbar.Brand href="/home">Boggle</Navbar.Brand>
  
  </Container>
</Navbar>



        );
}

export default Nvbar;