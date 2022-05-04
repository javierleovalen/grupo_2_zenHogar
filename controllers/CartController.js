const CartController = {

    index: (req,res) => {

        res.render('new_cart');
    },

   

}

const items = [

    {

        'id': 'silla-plegable-teca',
        'titulo': 'Silla de jardín de madera de Teca 47x43x89cm',
        'material': 'madera',
        'estructura': 'Madera de Teca',
        'esp-material': 'Un material que destaca por sus propiedades ideales para productos de exterior y especialmente por su durabilidad, resistencia y estabilidad. Una madera tropical muy popular y premium en el mobiliario de jardín.',
        'color': 'Marron',
        'precio': '$6000',
        'estilo': 'Natural',
        'dimensiones': '47 x 43 x 89cm',
        'peso': '3 kg',
        'caracteristicas': 'plegable',
        'esp-tecnicas': 'Para su mantenimiento, se recomienda ubicarlo bajo cubierta, protegido del sol directo, y guardarlo en un lugar seco y ventilado cuando no lo uses (o cubrir con una funda para muebles).',
        'montaje':'Este producto no requiere montaje',



    },

]





module.exports = CartController;
