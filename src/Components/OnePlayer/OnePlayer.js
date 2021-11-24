import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form} from 'react-bootstrap';
import './OnePlayer.css';

class LListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
    // getters and setters….
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
  // Cost: O(1)
  begin() {
    return LListIterator[Symbol.iterator](this.header.getNext(), this);
  }
  // Cost: O(n)
  clone(node) {
    if (node === null) return null;
    else return new LListNode(node.getValue(), this.clone(node.getNext()));
  }
  // Cost: O(1) 
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
        this.state = {puntaje: 100};
        this.state = {guess:''};
        this.state = {guessF:''};
        this.state = {Hash:[]};
        this.state = {alphabet: "QWERTYUIOPASDFGHJKLZXCVBNM"};
        this.state = {board: [ 
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
        this.setState({guessF: event.target.value});

    }

    changeVarible(value) {
      this.setState({puntaje: this.state.puntaje+value});
    }

    
  handleSubmit() {
      this.setState({guess: this.state.guessF});
  }

render() {
    
    

  this.state.puntaje = 0;
    const checkWord = (board = [], guess = '',Hash = []) => {
    
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
          if (obj.nextIndex === guess.length) {
            //this.state.puntaje = this.state.puntaje + 100;

            for (var i = 0; i < Hash.length; i++) {
              if (Hash[i] === guess) {
                return false;
                
              }
            }
            
            return true;
          }
          exploreWord(obj, queue);
        }
        return false;

        /*
        this.state.hTable.insert({
          id: 1,
          value: "Cat" 
        });
        this.state.hTable.insert({
          id: 56,
          value: "Dog" 
        });
        */

    }
    var resultado = checkWord(this.state.board, this.state.guess, this.state.Hash);
    if(resultado == true){
      this.setState({puntaje: this.state.puntaje+100});
    }

    return (

        <div class="Information">
        <Card className="text-center">
  <Card.Header>Featured</Card.Header>
  <Card.Body>
  <div>
          <div className="board-row">
          <Button variant="primary">{this.state.board[0][0]}</Button>
          <Button variant="primary">{this.state.board[0][1]}</Button>
          <Button variant="primary">{this.state.board[0][2]}</Button>
          <Button variant="primary">{this.state.board[0][3]}</Button>
          </div>
          <div className="board-row">
          <Button variant="primary">{this.state.board[1][0]}</Button>
          <Button variant="primary">{this.state.board[1][1]}</Button>
          <Button variant="primary">{this.state.board[1][2]}</Button>
          <Button variant="primary">{this.state.board[1][3]}</Button>
          </div>
          <div className="board-row">
          <Button variant="primary">{this.state.board[2][0]}</Button>
          <Button variant="primary">{this.state.board[2][1]}</Button>
          <Button variant="primary">{this.state.board[2][2]}</Button>
          <Button variant="primary">{this.state.board[2][3]}</Button>    
          </div>
          <div className="board-row">
          <Button variant="primary">{this.state.board[3][0]}</Button>
          <Button variant="primary">{this.state.board[3][1]}</Button>
          <Button variant="primary">{this.state.board[3][2]}</Button>
          <Button variant="primary">{this.state.board[3][3]}</Button>    
            
          </div>

          <div>
        
        <label>
          Palabra:
          <input type="text" value={this.state.guessF} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleSubmit}>Subir</button>
        
          </div>
          
        </div>
  </Card.Body>
  <Card.Footer className="text-muted">El puntaje es de: {this.state.puntaje}</Card.Footer>
</Card>

<h1>{resultado.toString()}</h1>

<Button variant="primary">Volver al menu</Button>
</div>


        
    );
    
}
}

export default OnePlayer;