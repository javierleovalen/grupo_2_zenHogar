const products = [
    {
        "name":"Sillon living comedor Verde",
        "price": 85000,
        "img": "/img/sillon_verde1.jpg"
    },
    {
        "name":"Sillon exterior de jarin",
        "price": 75000,
        "img": "/img/2019570.5.jpg"
    },
    {
        "name":"Silla Marron de jardin",
        "price": 55000,
        "img": "/img/2019907.1.jpg"
    }
]




const fs = require ('fs');
const CartController = {

    index: (req,res) => {
        const styles = ['normalize','home', 'cart']
        const titulo = 'Zen Hogar | Mi Carrito'
        res.render('cart', {
            styles:styles,
            titulo:titulo,
            products,
        });
    },

    productDetail: (req,res) => {
        const styles = ['normalize','home', 'product-detail']
        const titulo = 'Zen Hogar | Detalle del Producto'
        res.render('product-detail', {
            styles:styles,
            titulo:titulo,
            products,
        });
    },






   

}

const items = JSON.parse(fs.readFileSync ('./productos.json'));









// console.log(items[0].nombre); // items.find//

// const items = [

//     {

//         'id': 'silla-plegable-teca',
//         'titulo': 'Silla de jardín de madera de Teca 47x43x89cm',
//         'material': 'madera',
//         'estructura': 'Madera de Teca',
//         'esp-material': 'Un material que destaca por sus propiedades ideales para productos de exterior y especialmente por su durabilidad, resistencia y estabilidad. Una madera tropical muy popular y premium en el mobiliario de jardín.',
//         'color': 'Marron',
//         'precio': '$6000',
//         'estilo': 'Natural',
//         'dimensiones': '47 x 43 x 89cm',
//         'peso': '3 kg',
//         'caracteristicas': 'plegable',
//         'esp-tecnicas': 'Para su mantenimiento, se recomienda ubicarlo bajo cubierta, protegido del sol directo, y guardarlo en un lugar seco y ventilado cuando no lo uses (o cubrir con una funda para muebles).',
//         'montaje':'Este producto no requiere montaje',

//     },

// ]





module.exports = CartController;
