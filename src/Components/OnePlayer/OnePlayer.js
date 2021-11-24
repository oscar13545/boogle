import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button} from 'react-bootstrap';
import './OnePlayer.css';

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

class OnePlayer extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {hTable: new HashTable(10)};
        this.state = {alphabet: "QWERTYUIOPASDFGHJKLZXCVBNM"};

        this.state = {MaxHeap: [], Hash: [],resultado: 0,puntaje: 0, board: [ 
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

    changeVarible(value) {
      this.setState({puntaje: this.state.puntaje+value});
    }

    
  handleSubmit() {
      
      let existe = this.checkWord(this.state.board, this.state.guessF, this.state.Hash);
      this.setState({resultado : existe});
  }

  

  checkWord (board = [], guess = '',Hash = []) {
    
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
            return false;
          }
        }
        Hash.push(guess);
        console.log(Hash);
        this.setState({puntaje: this.state.puntaje+100});
        return true;
      }
      exploreWord(obj, queue);
    }
    return false;

}

handleSubmit1() {
  this.state.MaxHeap.push(this.state.puntaje);
  this.state.MaxHeap.push(300);
  this.state.MaxHeap.push(500);
  this.state.MaxHeap.push(700);
  this.state.MaxHeap.sort(function(a, b){return b - a});
  alert('El resultado numero 1: ' + this.state.MaxHeap[0] + '\nEl resultado numero 2: '+ this.state.MaxHeap[1] + '\nEl resultado numero 3: '+ this.state.MaxHeap[2]+ '\n\nTu resultado fue: '+ this.state.puntaje);


}



render() {
    
    return (

        <div class="Information">
        <Card className="text-center">
  <Card.Header>GAME</Card.Header>
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
  <Card.Footer className="text-muted">El puntaje es de: {this.state.puntaje}</Card.Footer>
</Card>
<br/>

<Button variant="warning"onClick={this.handleSubmit1.bind(this)} href="/Home">Terminar</Button>
</div>


        
    );
    
}
}

export default OnePlayer;