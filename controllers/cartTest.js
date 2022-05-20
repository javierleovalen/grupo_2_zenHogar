// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Patata',
        precio: 1,
        imagen: 'patata.jpg'
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1.2,
        imagen: 'cebolla.jpg'
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2.1,
        imagen: 'calabacin.jpg'
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 0.6,
        imagen: 'fresas.jpg'
    }

];
// carrito vacio
let carrito = [];

// se define el tipo de moneda
const divisa = '$';

// DOM: document object model o estructura del documento HTM o estructura que se puede modificar de forma dinamica

// document.querySelector Devuelve el primer nodo Element dentro del documento, en el orden del documento, que coincide con los selectores especificados.

const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVariar = document.querySelector('#boton-vaciar')


// funciones


/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */

 function renderizarProductos() {
     baseDeDatos.forEach((info)=> {
         
     }
     
     )}