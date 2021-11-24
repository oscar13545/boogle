import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form} from 'react-bootstrap';
import './TwoPlayers.css';

class LListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
    
}

class LList {
  constructor(values) {
    let current;
    this.header = new LListNode(null, null);
    current = this.header;
    for (const value of values) {
      let newNode = new LListNode(value, null);
      current.setNext(newNode);
      current = newNode;
    }
}
  
  begin() {
    return LListIterator[Symbol.iterator](this.header.getNext(), this);
  }
  
  clone(node) {
    if (node === null) return null;
    else return new LListNode(node.getValue(), this.clone(node.getNext()));
  }
  insert(pos, val) {
    const newNode = new LListNode(val, pos.current().getNext());
    pos.current().setNext(newNode);
    pos.next();
    return pos;
  }
}

const LListIterator = {
  [Symbol.iterator]: (node, llist) => {
    let current = node;
    if (node === null) current = llist.header;
      return {
        next: () => {
          if (current === null || current.getNext() === null) {
            return {
              done: true
            };
          }
          current = current.getNext();
          return {
            value: current,
            done: false
          };
        }
      };
    }
  };

  
  class HashTable {
    constructor(size) {
      this.elements = 0;
      this.size = size;
      this.buckets = [];
      for (let i = 0; i < size; i++) {
        this.buckets.push(new LList([]));
      }
    }
    find(item) {
      let pos = this.hashFunction(item);
      return this.buckets[pos].find(item);
    }
    erase(item) {
      const pos = this.hashFunction(item);
      const list = this.buckets[pos];
      const itemToErase = list.find(item);
      if (itemToErase !== list.end()) {
        list.erase(itemToErase);
        this.elements--;
      }
    }
  }

class TwoPlayers extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {hTable: new HashTable(10)};
        this.state = {alphabet: "QAWERETYUIIOPAOSDFGHUJKLZXCVBNM"};

        this.state = {Find: '',Equipo1: '', Turno: 1, Jugando: '', Equipo2: '',MaxHeap: [], Hash2: [], Hash1: [],resultado: 0,puntaje1: 0,puntaje2: 0, board: [ 
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]]
        ]
    };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value.toUpperCase();
        this.setState({guessF: value});

    }

    handleChangeEq1(event) {
        this.setState({Equipo1: event.target.value});
        this.setState({Jugando: event.target.value});

    }

    handleChangeEq2(event) {
        this.setState({Equipo2: event.target.value});

    }
    changeVarible(value) {
      this.setState({puntaje: this.state.puntaje+value});
    }

    
  handleSubmit() {
      if(this.state.Turno === 1){
      let existe = this.checkWord1(this.state.board, this.state.guessF, this.state.Hash1);
      this.setState({resultado : existe});
      this.setState({Turno : this.state.Turno+1});
      this.setState({Jugando : this.state.Equipo2});
      }else{
        let existe = this.checkWord2(this.state.board, this.state.guessF, this.state.Hash2);
        this.setState({resultado : existe});
        this.setState({Turno : this.state.Turno-1});
        this.setState({Jugando : this.state.Equipo1});
      }
  }

  

  checkWord1 (board = [], guess = '',Hash = []) {
    
    const numRows = board.length;
    const numCols = board[0].length;
  
  
    let queue = board.reduce((acc, row, i) => {
      row.forEach((x, j) => {
        if (x === guess[0]) {
          acc.push ( { pos: {r: i, c: j} , nextIndex: 1, path: [numCols*i + j ] } );
        }
      });
      return acc;
    }, []);
  
  
    let exploreWord = (obj, queue) => {
  
      let allMoves = [ {r: obj.pos.r - 1, c: obj.pos.c },
        {r: obj.pos.r + 1, c: obj.pos.c },
        {r: obj.pos.r, c: obj.pos.c - 1 },
        {r: obj.pos.r, c: obj.pos.c + 1 },
        {r: obj.pos.r - 1, c: obj.pos.c - 1 },
        {r: obj.pos.r - 1, c: obj.pos.c + 1 },
        {r: obj.pos.r + 1, c: obj.pos.c - 1 },
        {r: obj.pos.r + 1, c: obj.pos.c + 1 }
       ];
  
      allMoves.forEach((o) => {
        let index = numCols * o.r + o.c;
        if (o.r >= 0 && o.r < numRows && o.c >= 0 && o.c < numCols) {
          if (board[o.r][o.c] === guess[obj.nextIndex] && !obj.path.includes(index)) {
              let cloneObj = JSON.parse(JSON.stringify(obj));
              cloneObj.pos = { r: o.r, c: o.c };
              cloneObj.nextIndex += 1;
              cloneObj.path.push(index);
              queue.push(cloneObj);
          }
        }
      });
    };
  
    while (queue.length > 0) {
      let obj = queue.shift();
      console.log(guess);
      if (obj.nextIndex === guess.length) {
        
        
        for (var i = 0; i < Hash.length; i++) {
          if (Hash[i] === guess) {
            this.setState({Find: 'Ya fue encontrada por el equipo: '+this.state.Equipo1});
            return false;
          }
        }

        for (var j = 0; j < this.state.Hash2.length; j++) {
            if (this.state.Hash2[j] === guess) {
                this.setState({Find: 'Ya fue encontrada por el equipo: '+this.state.Equipo2});
              return false;
            }
          }
        
        Hash.push(guess);
        console.log(Hash);
        var sum = (guess.length-1)*100;
        this.setState({puntaje1: this.state.puntaje1+sum});
        this.setState({Find: 'Sumaste un total de '+sum});
        return true;
      }
      exploreWord(obj, queue);
    }
    return false;

}

checkWord2 (board = [], guess = '',Hash = []) {
    
    const numRows = board.length;
    const numCols = board[0].length;
  
  
    let queue = board.reduce((acc, row, i) => {
      row.forEach((x, j) => {
        if (x === guess[0]) {
          acc.push ( { pos: {r: i, c: j} , nextIndex: 1, path: [numCols*i + j ] } );
        }
      });
      return acc;
    }, []);
  
  
    let exploreWord = (obj, queue) => {
  
      let allMoves = [ {r: obj.pos.r - 1, c: obj.pos.c },
        {r: obj.pos.r + 1, c: obj.pos.c },
        {r: obj.pos.r, c: obj.pos.c - 1 },
        {r: obj.pos.r, c: obj.pos.c + 1 },
        {r: obj.pos.r - 1, c: obj.pos.c - 1 },
        {r: obj.pos.r - 1, c: obj.pos.c + 1 },
        {r: obj.pos.r + 1, c: obj.pos.c - 1 },
        {r: obj.pos.r + 1, c: obj.pos.c + 1 }
       ];
  
      allMoves.forEach((o) => {
        let index = numCols * o.r + o.c;
        if (o.r >= 0 && o.r < numRows && o.c >= 0 && o.c < numCols) {
          if (board[o.r][o.c] === guess[obj.nextIndex] && !obj.path.includes(index)) {
              let cloneObj = JSON.parse(JSON.stringify(obj));
              cloneObj.pos = { r: o.r, c: o.c };
              cloneObj.nextIndex += 1;
              cloneObj.path.push(index);
              queue.push(cloneObj);
          }
        }
      });
    };
  
    while (queue.length > 0) {
      let obj = queue.shift();
      console.log(guess);
      if (obj.nextIndex === guess.length) {
        
        
        for (var i = 0; i < Hash.length; i++) {
            this.setState({Find: 'Ya fue encontrada por el equipo: '+this.state.Equipo2});
          if (Hash[i] === guess) {
            return false;
          }
        }

        for (var j = 0; j < this.state.Hash1.length; j++) {
            if (this.state.Hash1[j] === guess) {
                this.setState({Find: 'Ya fue encontrada por el equipo: '+this.state.Equipo1});
              return false;
            }
          }
        
        Hash.push(guess);
        console.log(Hash);
        var sum = (guess.length-1)*100;
        this.setState({puntaje2: this.state.puntaje2+sum});
        this.setState({Find: 'Sumaste un total de '+sum});
        return true;
      }
      exploreWord(obj, queue);
    }
    this.setState({Find: 'La palabra no se encuentra en el arreglo'});
    return false;

}

handleSubmit1() {
  this.state.MaxHeap.push(this.state.puntaje1);
  this.state.MaxHeap.push(this.state.puntaje2);
  this.state.MaxHeap.push(300);
  this.state.MaxHeap.push(500);
  this.state.MaxHeap.push(700);
  this.state.MaxHeap.sort(function(a, b){return b - a});
  alert('El resultado numero 1: ' + this.state.MaxHeap[0] + '\nEl resultado numero 2: '+ this.state.MaxHeap[1] + '\nEl resultado numero 3: '+ this.state.MaxHeap[2]+ '\n\nEl resultado Equipo 1 fue: '+ this.state.puntaje1+'\nEl resultado Equipo 2 fue: '+ this.state.puntaje2);


}



render() {
    
    return (

        <div class="Information">
        <Card>
        <Card.Header><h4>Inserte en nombre de los equipos</h4></Card.Header>
        <br/>
             Equipo 1:
        <Form> <Form.Group className="mb-3" controlId="formBasicEmail">
            
        <Form.Control type="text" style={{width: '500px'}}  value={this.state.Equipo1} onChange={this.handleChangeEq1.bind(this)} />
        </Form.Group></Form>
        <br/>
             Equipo 2:
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" style={{width: '500px'}}  value={this.state.Equipo2} onChange={this.handleChangeEq2.bind(this)} />
        </Form.Group></Form>
        </Card>
        <div class="Information">
        <Card className="text-center">
  <Card.Header>Turno de {this.state.Jugando}</Card.Header>
  <Card.Body>
  <div>
          <div className="board-row">
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[0][0]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[0][1]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[0][2]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[0][3]}</Button>
          </div>
          <div className="board-row">
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][0]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][1]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][2]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][3]}</Button>
          </div>
          <div className="board-row">
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][0]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][1]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][2]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][3]}</Button>    
          </div>
          <div className="board-row">
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][0]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][1]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][2]}</Button>
          <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][3]}</Button>    
            
          </div>

          <div>
        <br/>
        <label>
          <input type="text" value={this.state.guessF} onChange={this.handleChange} />
        </label>
        <Button variant="success" onClick={this.handleSubmit}>Subir</Button>
        
          </div>
          
        </div>
  </Card.Body>
  <Card.Footer className="text-muted">{this.state.Find}</Card.Footer>
</Card>
<br/>
<Card>
    <Card.Header>Puntajes</Card.Header>
<Card.Body>
    Equipo {this.state.Equipo1}: {this.state.puntaje1}
    <br/>
    Equipo {this.state.Equipo2}: {this.state.puntaje2}
</Card.Body>  
</Card>
<br/>
<Button variant="warning"onClick={this.handleSubmit1.bind(this)} href="/Home">Terminar</Button>


</div>

</div>
        
    );
    
}
}

export default TwoPlayers;