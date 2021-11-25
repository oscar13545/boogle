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

  class MaxHeap {
    constructor(){
        
        this.values = [];
    }

    parent(index) {
      return Math.floor((index - 1) / 2);
  }
  
  
  leftChild(index) {
      return (index * 2) + 1;
  }
  
  
  rightChild(index) {
      return (index * 2) + 2;
  }
  isLeaf(index) {
    return (
        index >= Math.floor(this.values.length / 2) && index <= this.values.length - 1
    )
  }
  swap(index1, index2) {
    [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
  }
  add(element) {
    this.values.push(element);
    this.heapifyUp(this.values.length - 1);
}
heapifyUp(index) {
  let currentIndex = index,
      parentIndex = this.parent(currentIndex);

  while (currentIndex > 0 && this.values[currentIndex] > this.values[parentIndex]) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.parent(parentIndex);
  }
}
extractMax() {
  if (this.values.length < 1) return 'heap is empty';

  const max = this.values[0];
  const end = this.values.pop();
  this.values[0] = end;
  this.heapifyDown(0);

  return max;
}

print() {
  let i = 0;
  while (!this.isLeaf(i)) {
      console.log("PARENT:", this.values[i]);
      console.log("LEFT CHILD:", this.values[this.leftChild(i)]);
      console.log("RIGHT CHILD:", this.values[this.rightChild(i)]);
      i++;
  }      
}

heapifyDown(index) {
  if (!this.isLeaf(index)) {

      let leftChildIndex = this.leftChild(index),
          rightChildIndex = this.rightChild(index),

          largestIndex = index;

      if (this.values[leftChildIndex] > this.values[largestIndex]) {
          largestIndex = leftChildIndex;
      }

      if (this.values[rightChildIndex] >= this.values[largestIndex]) {
          largestIndex = rightChildIndex;
      }

      if (largestIndex !== index) {
          this.swap(index, largestIndex);
          this.heapifyDown(largestIndex);
      }
  }
  }
  buildHeap(array) {
    this.values = array;
    for(let i = Math.floor(this.values.length / 2); i >= 0; i--){
        this.heapifyDown(i);
    }
  }
  peek() {
    return this.values[0];
  }

}


class TwoPlayers extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {hTable: new HashTable(10)};
        this.state = {alphabet: "QAWERETYUIIOPAOSDFGHUJKLZXCVBNM"};

        this.state = {Find: '',Equipo1: '', Turno: 1, Jugando: '', Equipo2: '',MaxHeap: new MaxHeap(), Hash2: [], Hash1: [],resultado: 0,puntaje1: 0,puntaje2: 0, board: [ 
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]],
            [this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)],this.state.alphabet[Math.floor(Math.random() * this.state.alphabet.length)]]
        ],diccionario: ["que","de","no","a","la","el","es","y","en","lo","un","por","que","me","una","te","los","se","con","para","mi","esta","si","bien","pero","yo","eso","las","si","su","tu","aqui","del","al","como","le","mas","esto","ya","todo","esta","vamos","muy","hay","ahora","algo","estoy","tengo","nos","tú","nada","cuando","ha","este","se","estas","asi","puedo","como","quiero","solo","soy","tiene","gracias","o","el","bueno","fue","ser","hacer","son","todos","era","eres","vez","tienes","creo","ella","he","ese","voy","puede","sabes","hola","sus","porque","dios","quien","nunca","donde","quieres","casa","favor","esa","dos","tan","senor","tiempo","verdad","estaba","mejor","estan","va","hombre","usted","mucho","hace","entonces","siento","tenemos","puedes","ahi","ti","vida","ver","alguien","sr","hasta","sin","mi","solo","anos","sobre","decir","uno","siempre","oh","ir","cosas","tambien","antes","has","ni","mis","dia","estar","estamos","noche","nadie","otra","quiere","parece","nosotros","poco","padre","trabajo","gente","mira","vas","sea","les","donde","mismo","hecho","ellos","dijo","pasa","dinero","hijo","tal","otro","hablar","seguro","claro","estas","lugar","mundo","amigo","espera","mierda","han","tus","sabe","despues","momento","desde","fuera","cosa","tipo","manana","podemos","dije","gran","necesito","estado","podria","acuerdo","papa","tener","dice","mio","crees","buena","gusta","nuestro","nuevo","sera","haciendo","dias","nombre","buen","habia","ven","tres","menos","debe","tenia","mal","conmigo","madre","hoy","quien","sido","mama","tienen","luego","todas","alli","toda","hora","mujer","visto","haces","importa","contigo","ve","tarde","oye","parte","haber","hombres","problema","mas","saber","queria","aún","veces","nuestra","hacerlo","cada","hizo","veo","tanto","razon","ustedes","idea","esos","van","quiza","debo","alguna","cierto","ud","muerto","unos","estos","salir","policia","realmente","demasiado","familia","pueden","cabeza","hemos","amigos","chica","carino","lado","alla","entre","minutos","digo","algún","serio","cuidado","paso","buenas","somos","amor","puerta","ves","vaya","ah","suerte","eh","rapido","cuenta","quizas","io","esas","pues","pasado","pense","todavia","hermano","debes","casi","forma","aqui","chico","ok","dicho","nueva","sabia","muchas","dentro","hice","contra","auto","camino","ayuda","primera","hacia","vi","miedo","adios","primero","deberia","poder","ninos","seria","historia","hey","mientras","ciudad","dijiste","espero","cuanto","esposa","pronto","chicos","cualquier","viejo","debemos","deja","ano","muerte","hablando","manos","da","loco","problemas","mano","guerra","semana","pasar","vale","cual","viene","volver","toma","caso","agua","hare","vete","entiendo","horas","personas","capitan","adelante","nino","listo","noches","buenos","iba","juntos","dame","único","dejame","cerca","otros","sigue","grande","arriba","jefe","habla","supongo","manera","quieren","feliz","significa","sangre","fin","bajo","llama","venir","morir","importante","hiciste","ojos","escucha","entrar","ningún","corazon","diablos","necesitamos","atras","durante","dices","nuestros","persona","abajo","dr","hija","dejar","necesita","llegar","hago","senora","haya","suficiente","doctor","gustaria","tierra","cara","siquiera","genial","cree","supuesto","tomar","equipo","justo","juego","ninguna","matar","cinco","dicen","amo","cuando","pequeno","algunos","conozco","clase","maldito","unas","muchos","hubiera","segundo","aunque","pueda","dime","igual","comida","ay","cuerpo","encontrar","fuerte","vuelta","venga","creer","realidad","saben","puta","deberias","pregunta","fui","cuatro","sra","primer","trabajar","e","hagas","alto","maldita","comer","número","dar","necesitas","john","oportunidad","punto","misma","última","afuera","mujeres","pensar","fueron","dificil","vivir","paso","malo","estabas","vivo","haga","queda","hijos","mayor","fiesta","hacen","medio","algunas","basta","ei","arma","vino","meses","cuarto","este","escuela","este","dolares","tio","posible","tuve","facil","preocupes","jack","luz","eran","carajo","final","lista","trata","armas","hermana","exactamente","chicas","podia","bastante","seguridad","pasando","esperando","aca","telefono","perro","fuego","murio","tampoco","sola","estuvo","verte","ire","tenido","culpa","veras","adonde","buscando","cuanto","padres","paz","demonios","estara","cual","perdon","asi","jugar","pensando","esperar","sabemos","recuerdo","par","joven","seguir","pueblo","tenga","caballeros","idiota","dio","minuto","bebe","única","lejos","nuestras","plan","pienso","sentido","dormir","digas","palabra","correcto","control","vemos","entiendes","pais","seis","último","esta","diga","podrias","pequena","callate","trato","rey","sucede","sam","muchachos","jamas","cama","srta","ayudar","acerca","di","cambio","falta","hospital","lleva","presidente","mil","gusto","conoces","diciendo","os","ido","general","extrano","semanas","coche","peor","mucha","disculpe","dire","anoche","perder","vamonos","nave","cielo","habra","orden","segura","querida","nina","michael","increible","ademas","deben","libro","calle","cafe","piensas","hacemos","especial","queremos","ia","clark","irme","perfecto","buscar","odio","piensa","oficina","hablas","libre","agente","york","llamar","mala","detras","viste","dile","grandes","recuerdas","real","estaban","mia","frente","perdido","llamo","muertos","millones","asesino","sueno","quisiera","habria","hara","viaje","probablemente","peter","resto","estare","maldicion","lamento","muchacho","avion","ropa","fuerza","llamado","oido","frank","dado","encima","negro","usar","informacion","uds","preguntas","tuvo","secreto","vuelve","miren","quieras","haria","acaba","otras","incluso","sientes","deberiamos","haz","decirte","boca","dolor","bano","adentro","profesor","habitacion","dano","tuyo","seas","noticias","demas","querido","duro","poner","prueba","mire","tonto","campo","siendo","diez","ese","tranquilo","asunto","acabo","quedate","derecho","placer","recuerda","estuve","tratando","ejercito","futuro","llevar","compania","venido","listos","haremos","sitio","verlo","puesto","atencion","sino","cambiar","error","blanco","raro","palabras","llego","sal","pase","mente","sistema","pelicula","anda","ello","negocio","novia","permiso","crei","suena","ocurre","oficial","espere","aire","george","mato","harry","regresar","vio","hazlo","trasero","grupo","entendido","senorita","música","perra","conoce","empezar","siente","acabo","estúpido","diferente","traje","modo","james","encontre","mensaje","llamada","navidad","eras","pena","largo","entra","piso","foto","dijeron","medico","accidente","fuiste","imposible","podriamos","linea","propia","barco","ganar","normal","segundos","vive","mitad","quiera","tras","decirle","lindo","funciona","programa","vine","abre","sean","pagar","fotos","centro","supone","basura","situacion","mejores","vienen","encanta","marido","personal","maestro","hambre","ataque","culo","dale","pie","conseguir","trabajando","gracioso","dejo","pudo","derecha","izquierda","proxima","pobre","respuesta","tipos","sentir","tenias","pude","darle","voz","amiga","gustan","vista","salvo","loca","hotel","hicieron","ten","temo","senal","pelo","llevo","ayer","das","nena","servicio","tren","tom","bonito","mes","tendra","tendras","edad","ellas","hermosa","ben","honor","simplemente","llamas","tengas","corre","baja","sol","sientate","dan","humano","divertido","sexo","vuelto","peligro","mesa","jimmy","siguiente","hablo","disculpa","decirme","joe","caja","negocios","mision","silencio","sale","llegado","estaria","regreso","media","estan","propio","charlie","oro","enseguida","linda","prometo","esposo","norte","hubo","juro","muerta","interesante","pensaba","busca","terminar","tendre","completamente","cita","siete","cumpleanos","abogado","alrededor","cerebro","porque","llave","santo","hermoso","necesario","edificio","irnos","aun","tendremos","vayas","doy","trae","salio","ley","ahi","verdadero","pelea","banco","terrible","calma","cena","dare","gobierno","comprar","creen","sargento","destino","bob","existe","hacia","novio","sala","traves","regalo","iglesia","decia","cualquiera","excelente","esperen","deseo","alma","diablo","deje","cuantos","espada","estabamos","carne","maravilloso","vidas","sucedio","oi","peligroso","direccion","libertad","jesús","ocurrio","vere","suenos","pudiera","detective","sorpresa","tuya","pies","club","terminado","infierno","creia","luna","salvar","carta","estes","cielos","teniente","encuentra","david","veamos","quise","escúchame","necesitan","ambos","decision","roma","enemigo","hicimos","ei","dulce","pruebas","querias","abuelo","totalmente","mirando","vayan","carrera","vuelo","ante","bienvenido","haras","encontramos","encontrado","contacto","posicion","saberlo","planeta","humanos","coronel","junto","diria","esa","base","oir","suelo","pelear","ayudarte","pistola","frio","comandante","partes","llega","veras","sur","iremos","rato","mar","espacio","asesinato","ventana","prisa","tienda","camara","puedas","según","broma","reunion","despierta","sacar","ti","segunda","papel","locura","departamento","horrible","enfermo","pregunto","carcel","ordenes","intento","isla","salida","llamo","volvere","usa","gato","paul","hagan","dejes","duele","vengan","crimen","esperaba","causa","bar","sere","ocho","temprano","rio","relacion","drogas","luces","bromeando","ojala","hablamos","trabaja","irse","libros","radio","mary","ray","bill","vienes","quedan","excepto","brazo","tome","rojo","conocido","universidad","investigacion","batalla","reglas","cargo","hogar","ninguno","dieron","vuelva","sabias","respeto","estacion","corte","paciente","encuentro","energia","dejado","baile","fbi","abuela","caliente","vieja","viendo","veremos","rayos","simple","bailar","papa","triste","zona","seras","guardia","cancion","salud","escuchar","parar","mike","estaras","cenar","max","soldados","caballo","seran","estaremos","interesa","volar","principio","nivel","calmate","conocer","finalmente","alegro","debajo","podrian","bosque","bonita","bolsa","pone","taxi","ocupado","amable",
        "ryan","acaso","detente","imbecil","san","equivocado","viva","puso","obra","consejo","público","ayúdame","animales","azul","apuesto","prision","mirar","inteligente","metros","fantastico","proximo","jugando","ojo","salga","vea","llaman","entrada","duda","cerveza","unidos","matado","princesa","perdi","entender","santa","quedar","miles","llamare","companero","pensado","espalda","deje","bomba","alex","cartas","apenas","leer","hermanos","darme","papi","mantener","suyo","rico","verla","lee","bobby","sigues","toca","olvidalo","accion","hayas","dioses","mando","dejare","llegue","formas","uh","henry","cierra","damas","puente","memoria","regresa","muevanse","parecia","vestido","llaves","tv","camion","acabar","robot","llevo","monton","estuviste","maquina","puertas","podamos","muere","trago","mayoria","reina","lleno","ingles","don","soldado","estrella","escuche","valor","pido","delante","codigo","heroe","fe","capaz","verme","beber","velocidad","darte","llevas","partido","estuviera","tony","lex","dia","opinion","irte","cocina","abrir","perros","tambien","sepa","pareces","escribir","golpe","tenia","alta","estados","tocar","vuelvo","habian","ganas","hacerte","dejo","volvio","ejemplo","robert","contar","tenian","proposito","entiende","empieza","anillo","londres","tendria","pedir","estilo","ayudarme","pista","cambiado","escapar","eeuu","encontro","espiritu","viejos","molesta","nota","diferencia","tratar","precio","caballero","sirve","alegra","doble","agradable","embargo","tengan","tuvimos","sube","esten","mami","emergencia","cuello","boda","aprender","pete","te","informe","blanca","experiencia","debia","podido","mentira","director","mata","exacto","eddie","dejalo","defensa","tuviste","confiar","color","bond","hacerle","aquel","conoci","probar","principe","ira","soio","ai","despacio","tiro","vacaciones","perdio","fondo","chris","verde","parecen","mama","bienvenida","opcion","operacion","jim","hablado","traer","principal","demonio","zapatos","leo","anna","respecto","nuevos","especie","pidio","exito","cabron","mirame","piernas","unidad","hielo","llegamos","dejeme","ios","debi","vendra","matrimonio","habias","podra","piel","preocupa","quedarme","mio","tuviera","tiempos","richard","quienes","oiga","últimos","oigan","fuimos","arte","necesitaba","quienes","común","intentando","llevare","levantate","correr","brillante","calor","planes","dra","visita","presion","pared","esperanza","completo","subir","cansado","llame","recordar","trampa","monstruo","bajar","pierna","senores","tomo","pasara","mataste","grandioso","socio","herido","cayo","fuerzas","nick","cine","escena","tia","danny","dando","puntos","teniamos","dejaste","muevete","larga","solia","tema","preparado","depende","policias","solos","matarme","mark","pon","hubiese","bebe","tanta","oeste","paris","viento","jovenes","hacerme","asiento","carter","washington","estupendo","caminar","juicio","creerlo","carga","tranquila","banda","estaran","animal","escuchen","bush","encontraron","dejas","tarjeta","ibas","podras","nueve","seguramente","volvera","majestad","llena","caer","aeropuerto","vayamos","tommy","acabado","sigo","enorme","area","muevas","haberlo","dejen","ridiculo","reloj","hagamos","flores","mapa","culpable","cuentas","pareja","tomando","m","laboratorio","beso","empezo","pedi","nariz","cuestion","termino","vengo","the","perdona","acuerdas","verano","prefiero","peso","billy","oscuridad","diferentes","cliente","charles","cuantas","television","suya","prensa","johnny","vistazo","inmediatamente","solamente","gordo","quedarse","posibilidad","medicina","malditos","pantalones","mataron","ayude","podremos","locos","nombres","superman","parecer","america","definitivamente","cinta","desea","brazos","asuntos","riesgo","escuche","lugares","i","cuento","noticia","digame","decirlo","tonterias","sentimientos","objetivo","pasada","arreglar","casado","bote","roja","leyes","millon","arbol","hable","proyecto","nervioso","lana","salido","pedazo","malas","joder","humana","absolutamente","evitar","corriendo","bala","vosotros","despues","debido","confianza","especialmente","intenta","pequenos","paga","ganado","ama","limpio","comenzar","angeles","robots","lleve","ruido","preocupe","jason","belleza","salgan","come","vera","deberian","lider","preguntar","inocente","andy","lastima","red","enfermedad","desgraciado","haran","dientes","mate","central","ponte","felices","supe","haberte","marcha","poderes","hubieras","justicia","bella","de","proteger","cabello","pedido","oscuro","sarah","embarazada","costa","dama","alguno","orgulloso","vos","tomado","digamos","debio","gana","cura","lengua","arana","podre","voluntad","total","dedo","pago","agradezco","partir","lucha","leche","luke","diste","copa","quedarte","seguros","destruir","bienvenidos","llevan","jerry","ponga","lados","acceso","parker","intentar","trajo","desastre","deber","herida","debil","naturaleza","luchar","extrana","encontraste","vieron","llamame","imagen","pan","refieres","clientes","varios","show","auxilio","oyes","siguen","sentado","saliendo","responsable","olvidado","quedo","permite","aquella","puse","sonido","quiso","escrito","carro","preciosa","muestra","bastardo","restaurante","huevos","fantasma","mismos","profesional","amas","entero","peliculas","cerrado","dedos","sigan","dueno","cuchillo","turno","tormenta","caray","abierto","quede","verdadera","mato","doc","playa","km","victoria","primo","oiste","lisa","interior","hechos","piedra","jodido","militar","computadora","encantaria","siga","silla","movimiento","momentos","familiar","apartamento","disparar","tesoro","perfecta","refiero","motivo","dara","nuevas","mr","querer","matarlo","valiente","victima","tendran","estúpida","envio","steve","encantado","diario","abran","senti","autobús","traido","casas","apúrate","encuentras","descanso","sheriff","mulder","mueve","inglaterra","quieto","carl","matarte","calles","tamano","colegio","usando","cabo","video","toques","pelota","yendo","directo","termine","vivos","sombrero","tome","estudio","grave","proteccion","secretos","perdiendo","pecho","sepas","enferma","cuesta","negros","estrellas","lago","clases","b","obviamente","inmediato","modos","iras","robo","matare","seria","laura","apoyo","cerrar","imagino","amenaza","toque","larry","saca","viernes","hayan","roto","lucy","piloto","marca","combate","hable","manejar","seccion","profundo","tantos","conocia","serie","ed","contrato","americano","paseo","aviones","balas","repente","cambia","tropas","llevara","uso","pudiste","detener","susan","sabia","llegue","negra","decidido","comienza","distancia","eramos","murieron","averiguar","actuar","quedo","pulso","aguanta","oficiales","llamaba","enemigos","saldra","preocupado","eleccion","sobrevivir","bordo","sujeto","pacientes","disculpen","epoca","entro","pesar","hablo","walter","vender","piensan","ex","gratis","desaparecio","empleo","llame","conocen","cerdo","puedan","comprendo","tomo","termina","alejate","busco","contento","date","tumba","matt","huellas","cuerpos","absoluto","pide","kent","dura","descansar","respuestas","propiedad","llamando","dormido","castillo","china","datos","torre","robar","americanos","malos","botella","aquellos","últimamente","testigo","s","presento","periodico","kate","juez","historias","gustaba","creeme","necesitar","esquina","millas","llamadas","fuente","conocemos","techo","genio","alerta","ideas","tomas","olvidar","menor","droga","explicar","abierta","privado","miembros","joey","nacional","gusto","ross","discutir","evidencia","detalles","c","tardes","tomare","presente","scott","criminal","premio","vuelvas","sientese","viniste","recibir","mires","teniendo","huele","hables","guardias","enamorado","cuidar","pocos","perdone","natural","caballos","escucho","enfermera","angel","sospechoso","local","mentiras","camisa","confia","aceptar","venganza","perdimos","cuantos","parque","juegos","chloe","vives","varias","harias","menudo","dejenme","barrio","virus","talento","ministro","hiciera","robo","conocerte","viviendo","responsabilidad","respira","números","pertenece","desayuno","dave","campeon","controlar","maria","nieve","mexico","howard","dias","vergüenza","doctora","blancos","fumar","llevamos","europa","dudo","athena","pastel","quedas","cae","vimos","recibido","andando","agentes","fueras","asustado","perdoname","reino","clave","papeles","matando","jake","efecto","r","plata","olvide","iban","universo","politica","almuerzo","magia","lluvia","humor","autos","veia","tantas","respirar","cantar","trabajas","julie","disparo","conversacion","olor","asesinos","muchacha","modelo","jane","curso","canal","rock","llorar","borracho","regresen","vayanse","sentia","resultado","william","parado","olvides","mirada","inútil","california","acabas","ciencia","perdiste","sociedad","regrese","camioneta","cono","revista","parecio","montana","maravillosa","dejarlo","maximo","echar","corriente","escuchando","disculpas","cadaver","seguimos","ron","espectaculo","frodo","mundial","francia","decirles","aspecto","presencia","famoso","corto","relajate","poderoso","recuerdos","llego","carretera","pase","oigo","esperamos","escuchado","cable","rosa","bola","oferta","helen","intentarlo","habido","continuar","rachel","ladron","humanidad","estomago","entera","conto","poniendo","mercado","granja","idiotas","hablemos","estudiante","siglo","roger","relaciones","ias","hablan","adam","nosotras","miembro","fortuna","libres","acciones","esperas","suficientemente","llevaron","ocurrido","andar","perfectamente","pasan","jardin","cola","resultados","frances","troya","tercera","martin","entrenamiento","doug","azúcar","metido","ayudarlo","diles","coger","lunes","ey","new","intencion","volviendo","efectivo","chicago","dei","salgamos","preguntaba","olvida","helicoptero","fuertes","encantador","original","cadena","tarea","dispara","corta","companeros","cirugia","quitate","querian","precioso","lord","sara","comenzo","truco","inspector","enojado","felicidades","desaparecido","acto","pollo","elizabeth","chocolate","adonde","resulta","merece","gas","examen","vean","tonta","importantes",
        "apuesta","jean","directamente","recuperar","pongo","llegaron","cobarde","cantidad","sucio","habia","emperador","mono","encontraremos","disparen","gloria","contrario","socorro","sir","escaleras","seth","pasos","nuevamente","derechos","obtener","guste","búsqueda","helado","fútbol","sexual","polvo","aseguro","rostro","robado","policia","empresa","escuchas","pones","largate","interes","discúlpeme","dejaron","tengamos","firma","llevaba","llegas","cristo","tercer","senador","continúa","gracia","cien","texas","jones","des","tratado","razones","caminando","urgencias","u","raymond","esperan","muneca","firme","duerme","ambulancia","limpia","habeis","flota","leyenda","encuentre","fue","arturo","romper","muriendo","encontrarlo","rescate","quedado","enfrente","comienzo","arboles","x","queso","favorito","haberme","frontera","creemos","colega","jueves","alemanes","shrek","sabado","limpiar","puto","poquito","cientos","muero","irak","inteligencia","codo","funcionar","felicitaciones","escapo","criatura","milagro","deprisa","especiales","campamento","responde","escuchaste","debiste","adios","viven","recoger","preguntarte","compras","cansada","will","elegir","cancer","servir","pata","huir","útil","grados","atacar","sonny","recien","querria","guapo","alcance","smith","dejame","quedamos","llegara","seremos","desierto","t","licencia","fiona","trato","proceso","llevado","durmiendo","tension","martes","kilometros","cartera","trafico","guarda","impresionante","victimas","ricos","primeros","dejamos","tomen","iguales","domingo","crear","quedara","perdida","extra","fuese","confio","sabido","analisis","llegaste","fria","violencia","mate","lobo","discurso","actor","sexy","orgullo","odia","libras","alli","agencia","vuelvan","rose","necesidad","naves","descubrir","tira","resolver","pondre","volando","pensamos","mios","errores","celular","vincent","cuantas","claire","verlos","ayudarle","meter","hablare","esto","daniel","buscas","equivocada","dejan","vacio","trabajaba","salon","motor","conducir","compre","quizas","den","cerrada","cortar","ted","crea","sera","mueva","hazme","bravo","alan","pregunte","promesa","espejo","digale","sienta","medicos","cero","escribio","volveremos","unidades","cheque","consigue","antiguo","regla","pesadilla","enviar","podias","llevarte","entrenador","cuida","paciencia","dilo","levanta","complicado","superior","sugiero","familias","dira","pienses","temporada","suelta","jackie","corran","propios","feo","dispuesto","ayúdenme","teoria","salvaje","negativo","ibamos","hubieran","tripulacion","taza","perdida","vinieron","ponen","pasamos","parecido","brian","acepto","gay","cooper","senoras","quedare","parada","ninas","consegui","acabamos","normalmente","muchisimo","bruja","vegas","tuvieron","traigo","matara","kevin","funeral","conseguiste","teatro","paris","medianoche","biblioteca","estemos","túnel","encargo","aparece","testigos","penso","fueran","fantasmas","correo","vuestro","piscina","paquete","copia","alice","suicidio","molly","credito","consigo","carol","vuestra","rara","legal","hablaremos","cambio","solas","salimos","ganador","estudiantes","despierto","pare","invitado","guia","oso","lei","explosion","dejarme","chino","stan","lois","sorprende","sistemas","nacion","entienden","arena","mentiroso","hablaba","veas","pura","asesinado","mintiendo","casos","vehiculo","rata","importancia","distinto","pintura","intente","conciencia","miras","maquinas","traere","revisar","veinte","seres","hablarle","disco","viktor","transporte","mina","labios","senoria","llamamos","doce","cuidate","pasillo","tele","podria","completa","rapida","precisamente","llamaste","cumplir","servicios","senales","acaban","am","sueltame","hablarte","trate","pescado","huesos","daria","compra","trajiste","templo","placa","posibilidades","ira","vengas","siguiendo","podran","llamarme","cierta","permitir","condiciones","atrapar","temperatura","explicacion","enviado","contado","asistente","imperio","pidiendo","notas","curioso","operaciones","manten","tierras","creas","pez","morira","vision","montanas","jeff","d","comido","construir","comunidad","veran","pierde","piense","felicidad","ee","diversion","salvo","thomas","quita","museo","disparo","desearia","misterio","buscamos","aviso","almirante","solucion","pequenas","faltan","existen","combustible","leido","tirar","responder","esfuerzo","vuelves","uu","pajaro","hermanas","guerrero","esposas","coma","abra","traes","sientas","rocky","olvide","joseph","bolsillo","heridas","saco","gasolina","conexion","correcta","pedazos","lineas","estarias","convierte","ayudara","rumbo","rompio","muera","mia","material","diamantes","rapidamente","mirate","fecha","escritorio","digan","registro","maten","incendio","deme","sois","pensamientos","dimelo","comiendo","aparte","asesinatos","roy","leccion","algun","abrigo","tratamiento","julio","pene","conejo","suceder","ruta","ciego","asqueroso","súper","prisionero","odie","ocupada","llevarlo","jenny","empezamos","emily","ethan","estuvimos","decirselo","oscar","honesto","entrevista","antigua","amante","humo","gustas","condado","conseguido","viajar","sombra","sabra","refiere","lio","estais","entrega","dracula","compartir","angeles","volvamos","sonrisa","sencillo","atrapado","aburrido","pocas","pensaste","dragon","anne","volvi","planta","clima","adoro","suave","ruso","rodillas","marina","bolso","betty","alarma","vivia","quedese","recompensa","juega","hollywood","cigarrillo","autoridad","amigas","agujero","acabe","sacaste","orgullosa","jackson","entendi","dijera","sotano","paredes","guapa","iria","imaginar","fiebre","dejala","boton","preguntarle","leyendo","darles","uniforme","dulces","vaso","documentos","ruego","maneras","king","invitados","comodo","ayudarnos","visitar","vigilancia","nadar","altura","todavia","preparados","gary","cuales","mover","jugador","izquierdo","alejandro","tecnologia","raza","conocerlo","conde","social","gobernador","coge","pedro","cubierta","chiste","celda","agarra","secreta","personalmente","miller","amistad","amaba","nacio","interesado","intentado","educacion","curiosidad","buscan","repito","pecado","mortal","manda","claramente","via","juntas","identificacion","dirige","declaracion","aleman","tontos","mantiene","bestia","veneno","vecinos","supiera","quieran","salgo","propias","privada","jurado","golpes","usan","metas","lenny","garganta","invierno","fila","ricky","miel","traigan","sucedido","tranquilos","madera","burro","artista","sophie","pobres","louis","impresion","gano","cruzar","cigarrillos","scully","o","llevarme","grial","chaqueta","alcalde","vueltas","usado","reputacion","pongas","oxigeno","cajas","preocupada","matan","liz","empezando","cabezas","ponerme","experto","oceano","maestra","cia","pieza","cargos","bombas","alcohol","trataba","salen","pizza","patrick","recibi","junta","criaturas","aparecio","actitud","gira","cristal","bourne","amy","encuentran","dejarte","caido","ultima","j","sensacion","seguido","puro","whisky","vernos","pantalla","bebida","estudiar","ducha","despedido","consiguio","venia","pagan","discúlpame","articulo","aparentemente","ambas","trauma","pusieron","fiestas","contesta","contenta","ambiente","prometi","llegando","mostrare","deba","berlin","nerviosa","hallar","dudas","llegan","instrucciones","baje","vinimos","ritmo","quedense","suponia","marcus","pistas","palacio","gordon","encontrare","venta","urgente","tomamos","sali","cuerda","vendria","pasaba","instante","almas","suficientes","secundaria","saltar","queria","quedarnos","molesto","colina","porqueria","dean","sienten","pondra","terroristas","empece","pongan","phoebe","moto","opinas","habilidad","entren","descubierto","convertido","asegúrate","summer","quede","kilos","florida","tomara","sufrir","mental","lograr","instituto","um","serlo","rapido","plato","llorando","vd","vayase","sucediendo","robaron","alemania","bolas","luthor","pasaria","ocurra","ilegal","fresco","falso","abogados","tomalo","mando","cuan","cuales","botas","tiburones","marissa","grado","deseas","archivos","adivina","cruz","campana","asustada","centavos","vivimos","galletas","frecuencia","danos","minas","emociones","dejara","regreso","ratas","pasion","julia","joel","hacerse","comportamiento","pense","conocimiento","bin","sales","fiscal","decisiones","criminales","camaras","amanecer","convirtio","aldea","abandonar","obvio","habiamos","apesta","abandonado","volveras","preocuparse","kim","favorita","lanzamiento","dificiles","vivido","roca","peces","maravilla","espacial","conductor","camarada","trabajado","caramba","sopa","numero","gritar","envia","casino","alteza","karen","identidad","cambios","guardar","gatos","gane","arresto","estas","pregunto","estos","probable","seamos","importaria","firmar","federal","caras","trabajos","houston","hagamoslo","expediente","tigre","intento","harto","decidir","periodicos","casarse","lento","hecha","daba","simon","ponerte","pelotas","monstruos","ie","cruel","city","senoritas","gigante","dick","siglos","escalera","incidente","escenario","diras","ciertas","casar","llamen","biblia","reporte","moda","casada","reaccion","falla","castigo","facilmente","caza","annie","magnifico","decidi","camina","superficie","procedimiento","condicion","asalto","virgen","verle","conocimos","quitar","donna","tratas","noble","laden","hierba","excelencia","asco","white","titulo","regresare","ejercicio","pasaporte","extranos","ciento","afortunado","saco","iran","sacerdote","pedirle","impuestos","crisis","aventura","to","puestos","panico","oz","llames","ladrones","enseno","logramos","estuvieron","últimas","pagina","metro","grace","enterprise","alla","pudieron","mostrar","escribe","ventaja","enamorada","boston","usr","gorda","vendran","paren","xena","piedras","pesado","despertar","warren","pierdes","jesucristo","damos","treinta","recuerde","earl","capacidad","soportar","senado","grant","decidio","preparense","asusta","aquiles","aquello","and","aguantar","cohen","aprendi","teneis","parezca","alegria","territorio","fisica","escape","tomes","sandy","excusa","estudios","arthur","shaw","septiembre","personaje","fabrica",
        "elegido","cole","tanque","salta","hablaste","conferencia","compromiso","ayudare","salieron","rusos","parezco","llevando","exterior","punta","ponerse","pasen","puerto","decirtelo","caro","asombroso","pasara","mataran","maleta","competencia","canciones","miranda","cinturon","saint","papas","marco","destruccion","terry","paraiso","meta","alternativa","socios","alas","w","ocasion","casarme","salsa","romano","prisioneros","fogg","encantan","encantadora","comercial","primavera","metio","luther","johnson","volvemos","mandar","luce","sagrado","nacido","fabuloso","echo","desaparecer","potencia","adn","traiga","permitame","mayores","regalos","pusiste","peligrosa","militares","jodida","coincidencia","bandera","adivinar","wilson","tubo","partida","opciones","llamaron","hombro","vampiros","sabian","recibio","marty","jugadores","celebrar","armario","tetas","paliza","sabor","miralo","lata","heroes","aigo","serpiente","escribi","comite","bendiga","termine","oyo","imaginacion","funciono","bello","higado","cierre","cabina","queriamos","pasas","mantente","japon","deseos","cuentame","rastro","compro","anterior","acero","desnudo","comisario","catherine","refuerzos","preparar","perdidos","pagare","miami","huevo","entrando","armada","trate","supo","bromeas","verdaderamente","napoleon","miro","limite","esperemos","sacado","diamante","secuestro","casco","ayudo","nene","marcas","francisco","pudieras","poca","jugo","heridos","congreso","cementerio","prostituta","desaparece","consecuencias","terreno","salvado","mueren","igualmente","ganamos","circunstancias","trabajamos","marie","jill","amen","katie","funcionando","evan","personalidad","muro","contestar","razon","peores","particular","llevame","gimnasio","garfield","emocionante","desgracia","cientifico","buscado","buddy","v","terapia","prepara","phil","patrulla","globo","despejado","creado","aprendido","naci","lanning","embajador","barcos","posiblemente","malvado","dormitorio","despacho","desagradable","viniendo","riddick","recibo","nuclear","mensajes","mantengan","ultimo","autoridades","quedes","pasaron","gano","ayudo","aprecio","sentimiento","popular","extranas","detenerlo","civiles","tonteria","reyes","americana","vuelven","ventanas","tiburon","seiya","peleas","organizacion","jedi","ayudarla","tuvieras","sally","querras","querra","kelly","infeccion","decente","logrado","jersey","amar","wayne","equipos","canta","bebes","pozo","india","esperado","ensenar","darnos","brown","tomaste","internet","habilidades","encanto","dispararon","comprendes","africa","adorable","rica","llegaremos","harold","reales","mismas","medios","marihuana","traidor","martha","funcione","clinica","preferiria","podian","olvido","fred","entramos","ejercito","division","sector","perdedor","patron","encontrara","crema","barry","planeado","mantenga","juguete","edward","tecnica","nacimiento","esperare","tim","termino","matas","entrado","destruido","daremos","circo","ascensor","andrew","aca","investigar","encuentren","archivo","salve","presentar","logro","intentas","encargare","armado","apuestas","maggie","arrestado","union","permanecer","muestrame","movil","louise","juan","dificil","casados","canon","bruce","tribunal","sepan","satelite","recuerden","intentare","falsa","coca","black","simbolo","rocas","putas","pendejo","matalo","judio","estando","subtitulos","gritando","dejemos","cientificos","bebiendo","saque","navorski","metal","despedida","golf","empiece","defender","crecer","rota","sentimos","n","guerreros","echa","comunicacion","probado","pensarlo","hablame","detenido","sabria","muertes","movimientos","prohibido","pajaros","kane","cargar","willie","podiamos","junior","imagenes","haberse","acusado","peleando","lealtad","considera","cazador","buscarlo","apaga","objeto","sofa","personales","mac","homicidio","electricidad","advertencia","rumores","mentir","fijate","deuda","celoso","bicicleta","azules","visitas","mejorar","escudo","cueva","aerea","nathan","levantar","juguetes","ciertamente","bajen","aaron","you","temas","pedirte","mcdonalds","elegante","divorcio","deposito","concierto","calla","transmision","mataria","flor","wyatt","viejas","trabajan","onda","saldremos","preguntado","aliento","academia","sonar","recibe","patio","funcion","conduce","benton","pregúntale","palo","internacional","hueso","heather","esclavos","version","sacrificio","judios","increible","in","fotografia","delicioso","crimenes","zorra","valle","llevaremos","lentamente","encantada","arreglo","volveria","logro","romantico","preocuparte","olvido","fascinante","cuadro","creyo","adultos","wow","sobrino","secuencia","nicky","lleven","huh","entradas","decirnos","resistencia","llamarlo","greene","ayudas","esperanzas","disponible","civil","caos","audrey","velas","tenerlo","ponerle","muestras","logica","casualidad","sigamos","rayo","pato","pagado","mascara","gustado","buscarte","selva","pm","equivoque","condenado","cometido","west","travis","tratan","pudimos","preguntando","tragedia","poli","oliver","companias","charla","mete","malditas","campos","cadaveres","basicamente","vamonos","trucos","preparada","funcionara","conte","contando","construccion","ciudadanos","agarrar","infeliz","francesa","explica","decide","vende","rutina","gustar","empieces","caida","almorzar","actividad","inocentes","fondos","coraje","ayudando","aterrizar","actuacion","vietnam","suba","h","cynthia","ayudante","vuela","vaca","dc","cirujano","tio","olvidate","okay","entregar","encerrado","rubia","kong","joyas","empecemos","buzz","amado","terminamos","romanos","piedad","llamarte","hacian","furia","detalle","admitir","tendrias","respiracion","preparate","escribiendo","confundido","vigilando","sufrimiento","saludos","robaste","l","golpear","garaje","buscare","revolucion","motel","buscaba","alianza","otto","estupidez","disparado","sangrando","quietos","miserable","ideal","empiezo","controla","prometiste","heroina","empezado","damelo","vecindario","empleado","conociste","colores","cerebral","plastico","piano","pensamiento","lewis","letra","empleados","dosis","dolar","benny","apolo","agrada","tocado","tios","super","rifle","renunciar","incluyendo","hoyo","espanol","acepta","rueda","municiones","ciudades","beisbol","regresado","pediste","ja","sesion","comprender","tocando","montar","ma","familiares","espia","efectos","salto","pago","impacto","emocion","disparos","comando","autorizacion","informes","honestamente","existencia","demasiada","coches","clara","alcanzar","volviste","octubre","g","conseguimos","barato","apostar","requiere","importan","grano","demasiados","casarte","traeme","rick","progreso","odias","ocurrir","hacias","serias","secretario","rusia","piensalo","gatito","deme","coleccion","vais","sufrido","ningun","helena","harris","terror","salva","salgas","sacarte","lanza","uso","quince","prometido","preciso","pirata","park","moral","moneda","kyle","hare","haberle","estuvieras","dijimos","cayendo","bajas","viniera","sonando","servira","moscú","minimo","hermosas","escondido","eric","demostrar","perrito","jordan","intente","habran","experimento","espaldas","diseno","barra","anciano","alfombra","actriz","tono","sentarse","remedio","listas","gris","enviaron","entendiste","disfrutar","contare","comen","sentada","pregunte","japones","gritos","dolares","asegurarme","restos","piper","pierdo","motivos","josh","dimos","campeonato","apúrense","unico","reir","prima","maricon","actúa","periodista","luchando","estelar","escritor","encontraras","dejando","adecuado","terrorista","lady","hierro","enterrado","big","sincero","sharon","representa","positivo","mereces","italia","fea","acerques","petroleo","encargado","capitulo","ensenare","cuentos","breve","atreves","súbete","sed","patetico","mostrarte","doctores","caracter","tuyos","plaza","obispo","necesite","muevan","involucrado","frankie","daran","robin","ingleses","usas","ruedas","practicamente","orejas","golpeo","costado","conducta","toman","suban","medica","manzana","jonathan","escuadron","reconozco","ordenes","gallina","cambiando","borde","ataques","actual","victor","polly","pecados","invito","inconsciente","bastardos","abrio","shaun","oyeron","intentaba","cuartel","consciente","tranquilizate","suyos","residencia","maxima","llevarla","grasa","celulas","retrocedan","recepcion","medicinas","explotar","corona","callate","calidad","ayúdeme","asesina","absurdo","reves","producto","nancy","encontrarla","dj","descansa","copias","apagar","profesionales","practica","investigando","francamente","calvin","afganistan","vecino","trozo","tomate","tercero","sirven","saquen","manual","enciende","cercano","bailando","atras","usarlo","telefono","registros","ponlo","pasta","lleguen","saliste","sabras","p","morgan","limpieza","estadounidense","enojada","desafortunadamente","conocio","pinta","matamos","funcionan","cocinar","cima","atractivo","preguntes","necesitare","lleguemos","interrumpir","haberla","apropiado","presentimiento","intentamos","finales","evitarlo","enviare","deporte","bajando","sucia","recibimos","pastillas","ceremonia","tina","muelle","maletas","k","hijas","desconocido","conseguire","taylor","refugio","imagina","franceses","convertirse","arruinado","vomitar","pasajeros","normales","disfraz","continúe","arreglado","aprende","venimos","tenerte","seguira","razonable","puesta","masaje","lagrimas","gustaria","extranjero","dejaremos","carlos","apellido","alguacil","tracy","temporal","rompe","mayo","egoista","aceite","platos","miercoles","indios","decimos","creasy","bolsas","anuncio","tirado","notado","mutantes","imaginas","habitaciones","grecia","entre","diselo","cesar","stanley","holly","comprado","cocaina","amarillo","acabara","suceda","mentes","maldad","gustara","eliminar","corbata","burke","atrapados","sabiamos","merezco","medalla","lograste","lionel","jaula","dio","chofer","informado","fox","fatal","enfadado","cubierto","companera","ronda","regina","cobra","cantante","abrazo","tarjetas","sentarme","referia","indica","gravedad","ganando","estúpidos","elecciones","collar","cincuenta","programas","naturalmente","embajada","desayunar","dejaria",
        "vigila","quisieras","intereses","agarrate","aereo","traicion","seguire","salvajes","prefiere","podeis","noel","mueres","molestar","italiano","dejarla","corazones","averiguarlo","ave","arreglarlo","advierto","vendiendo","pública","newman","monje","jugamos","hablarme","escoger","andas","vi","teddy","pico","lleve","entro","tenias","priorato","perdemos","industria","cretino","cafeteria","cabana","aparecer","tradicion","suelto","publicidad","pares","oidos","medida","japoneses","hitler","dieta","capa","vendras","sincronizado","neil","historial","guion","enano","devolver","solitario","misiles","hall","desnuda","bridget","brad","vaquero","únicos","trasera","sano","piezas","liga","gerente","cindy","caridad","armados","trajeron","religion","jon","fotografias","sentirse","rezar","protege","preparen","ninera","naranja","matarnos","jugada","gandalf","esperame","ensenarte","cohete","tanques","sombras","moverse","llegara","corto","cierren","volveran","usamos","sabremos","potter","maletin","lenguaje","jenna","invitacion","cambian","rehenes","margaret","freddy","encontremos","descubri","audiencia","agenda","wallace","sigueme","sensible","sammy","reverendo","quereis","dex","cazar","bodas","seguiremos","rosas","retiro","primeras","poderosa","matthew","deberia","cantando","antiguos","teme","smallville","siganme","moviendo","juventud","equivocas","trabajadores","segui","salvaste","pulmones","payaso","oirlo","fama","engano","distrito","disculparme","davis","ciudadano","robando","equipaje","ciencias","ubicacion","federales","tratamos","ofrece","of","junio","extremadamente","actuando","traduccion","supiste","sacarlo","preparando","mei","letras","tipico","reserva","propuesta","plataforma","mago","linea","hank","dude","busque","tabaco","principios","lou","dormida","costo","causar","temer","subiendo","rollo","ns","hechizo","gusano","guau","grupos","discos","despierte","st","ocurriendo","horario","expedientes","envie","dibujos","concurso","colt","autopista","ataco","vendedor","sigas","rebeldes","radar","madame","expresion","escuchan","carla","use","resulto","principe","hagalo","greg","exposicion","demasiadas","cuidando","aterrizaje","apetece","tomaron","sorprendente","responda","olvidaste","lobos","echado","deberias","cortado","citas","abiertos","zapato","preso","lastimar","explosivos","colegas","telly","supieras","secretaria","queridos","moriras","mickey","cuero","confesion","circulo","sabeis","quimica","obras","llores","juegas","invisible","fase","esconde","capitan","adulto","vacia","sientense","pastor","llegada","jesse","gatillo","debamos","telefonos","saque","regresara","olvidare","lucas","limites","jovencita","hong","dibujo","britanico","balboa","psiquiatra","objetos","negociar","hill","formar","fiel","diosa","descubrio","ala","abril","saldre","mias","disfruta","atender","tomaremos","samantha","rosie","oreja","necesitaremos","motores","intenciones","hannah","cumplido","brindis","villa","trono","traen","thunderbird","sentados","samurai","salia","raras","produccion","medias","lavar","jazz","extraordinario","causado","angie","serpientes","revisa","quedate","nervios","estable","cerdos","riesgos","pasaste","michelle","madres","instinto","episodio","empezaron","aniversario","angela","anderson","viera","viajes","trabaje","rango","preocupacion","metete","imagine","hayamos","fenomeno","dolores","demanda","damien","creo","asegurar","pesadillas","niega","molestia","kirk","extremo","debilidad","compasion","camiones","aproximadamente","afecta","administracion","reconocimiento","recientemente","practicar","pierdas","pandilla","miss","mates","disparando","britanicos","ayudarlos","abby","sueldo","siguio","significado","miente","medidas","guitarra","custodia","boletos","ayudado","sydney","sentarte","risa","quemar","prometio","observando","lectura","jodete","considerado","cometer","cambie","asientos","wong","shock","satisfecho","saludable","lanzar","ken","hoja","conozca","concepto","colgar","apunta","renta","prefieres","pedire","mediodia","influencia","hacernos","figura","ensayo","coordenadas","caso","bart","albert","politico","paises","once","matarlos","karl","graduacion","frase","eterna","estarlo","descuida","toalla","proximos","monedas","mirad","miraba","jesus","griegos","famosa","corredor","atravesar","aguas","modales","guerras","eternidad","conocerla","charlotte","busquen","buck","acuerda","sentirme","ralph","quema","poema","ordeno","espiritual","costumbre","comence","cabra","alquiler","williams","vencido","vela","tratare","sospechosos","quinto","pilotos","philip","perdieron","norman","jose","generacion","formacion","estructura","concentrate","complejo","voces","virginia","tragos","temor","república","recursos","presentacion","piramide","oficialmente","maquillaje","guardaespaldas","escucharme","dejara","contiene","bendicion","vuestros","semejante","pague","molestes","cultura","comio","antecedentes","tendriamos","representante","prestado","posesion","oir","nubes","meterte","guantes","esperabas","ensena","encontrarme","consejos","regreses","preocupen","pistolas","jennifer","gane","dana","sos","niveles","lane","ganaste","considerando","capital","cambie","animo","utilizar","lograrlo","llevate","gafas","espiritus","do","watson","ruby","preguntaste","pagara","maiz","ho","estacionamiento","contactos","aguja","turner","trenes","soporto","sacare","oido","fortaleza","donald","corea","conversar","computadoras","calmese","volante","sucedera","jessica","decias","data","cuente","civilizacion","cabrones","arruinar","vampiro","toco","regrese","pases","mitch","megan","logan","fantastica","facil","estabamos","diera","detenga","violacion","pam","hemorragia","fianza","docena","centavo","celula","carreras","callado","rodilla","prometes","profundamente","posiciones","hicieras","furioso","desperte","comes","ciega","cicatriz","bebidas","acercate","tiro","policial","pasear","masa","llegues","global","escapado","dinos","cuarta","bienes","aparato","steven","sosten","realizar","permitire","orgullosos","corten","comision","vidrio","presa","ocupados","morfina","habrian","columna","sacaron","patas","oirme","ocultar","objecion","myers","maneja","largas","generalmente","fuentes","cubrir","ataca","tenis","santos","potencial","plano","murphy","levante","escala","enfrentar","cuanta","sobra","rumor","paginas","organos","leon","entras","decian","chinos","brujas","barbara","admiro","voto","volvieron","suelte","reto","metes","infarto","cuyo","construyo","boleto","besar","portal","ponemos","monte","discusion","digno","desean","darse","considerar","bancos","pocion","perdoneme","pensabas","monica","generoso","estatua","convencer","conocida","comenzamos","aceptado","woody","rob","paige","importar","gabrielle","fracaso","ciertos","bomberos","ze","sorprendido","protegido","presenta","meti","entenderlo","detengan","conflicto","codigos","seco","sabiendo","hacerla","green","graves","dejaras","convencido","comprende","bromas","yeah","oyen","moleste","mencionar","gastos","estariamos","esperaremos","encontraran","billetes","arco","altos","actores","talvez","sitios","saluda","quejas","planeando","moriremos","marica","habrias","estarian","dejaran","castle","amantes","acostumbrado","tyler","torneo","planos","ordeno","morris","mire","maldicion","kg","dirias","confirmado","vacas","quirofano","ponerlo","origen","fusion","debera","verdaderos","serian","seguia","sabran","pasaje","necesidad"]
    
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

        /*

        if(this.state.Htable.find===false){
            this.setState({Find: 'Ya fue encontrada por el equipo: '+this.state.Htable});
            return false;
        }else{
            this.state.Htable.insert(guess);
        }
        */
        
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

          for (var x = 0; x < this.state.diccionario.length; x++) {
            if (this.state.diccionario[x].toUpperCase() === guess) {
                Hash.push(guess);
                console.log(Hash);
                var sum = (guess.length-1)*100;
                this.setState({puntaje1: this.state.puntaje1+sum});
                this.setState({Find: 'Sumaste un total de '+sum});
              return true;
            }
          }
          this.setState({Find: 'La palabra no existe'});
              return false;



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
          /*
        if(this.state.Htable.find===false){
            this.setState({Find: 'Ya fue encontrada por el equipo: '+this.state.Htable});
            return false;
        }else{
            this.state.Htable.insert(guess);
        }
        */
        
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
          for (var x = 0; x < this.state.diccionario.length; x++) {
            if (this.state.diccionario[x].toUpperCase() === guess) {
                Hash.push(guess);
                console.log(Hash);
                var sum = (guess.length-1)*100;
                this.setState({puntaje2: this.state.puntaje2+sum});
                this.setState({Find: 'Sumaste un total de '+sum});
                return true;
            }
          }
          this.setState({Find: 'La palabra no existe'});
              return false;

        
      }
      exploreWord(obj, queue);
    }
    this.setState({Find: 'La palabra no se encuentra en el arreglo'});
    return false;

}

handleSubmit1() {
  this.state.MaxHeap.add(this.state.puntaje1);
  this.state.MaxHeap.add(this.state.puntaje2);
  this.state.MaxHeap.add(300);
  this.state.MaxHeap.add(500);
  this.state.MaxHeap.add(700);
  var primerlugar = this.state.MaxHeap.extractMax();
  var segundolugar = this.state.MaxHeap.extractMax();
  var tercerlugar = this.state.MaxHeap.extractMax();
  alert('El resultado numero 1: ' + primerlugar + '\nEl resultado numero 2: '+ segundolugar + '\nEl resultado numero 3: '+ tercerlugar+ '\n\nEl resultado '+this.state.Equipo1+' fue: '+ this.state.puntaje1+'\nEl resultado '+this.state.Equipo2+' fue: '+ this.state.puntaje2);
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
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[0][4]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[0][5]}</Button>
  </div>
  <div className="board-row">
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][0]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][1]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][2]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][3]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][4]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[1][5]}</Button>
  </div>
  <div className="board-row">
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][0]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][1]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][2]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][3]}</Button>  
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][4]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[2][5]}</Button>  
  </div>
  <div className="board-row">
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][0]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][1]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][2]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][3]}</Button>   
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][4]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[3][5]}</Button> 
  </div>
  <div className="board-row">
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[4][0]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[4][1]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[4][2]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[4][3]}</Button>   
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[4][4]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[4][5]}</Button> 
  </div>
  <div className="board-row">
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[5][0]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[5][1]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[5][2]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[5][3]}</Button>   
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[5][4]}</Button>
  <Button variant="dark "style={{width: '50px'}}>{this.state.board[5][5]}</Button> 
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
<Button variant="warning" onClick={this.handleSubmit1.bind(this)} href="/Home">Terminar</Button>


</div>

</div>
        
    );
    
}
}

export default TwoPlayers;