const { json } = require("express");

const productos = [
    {
        id: 1,
        nombre: "Guantes  de entrenamiento",
        precio: 15000,
        categoria: "Accesorios"
    },
    {
        id: 2,
        nombre: "Colchoneta",
        precio: 20000,
        categoria: "Equipamiento"
    }
];

const obtenerProductos = (req,res) => {
    res.json(productos);
};

const obtenerProductosPorId = (req,res) => {
    
    const id = Number(req.params.id);

    const producto = productos.find( (p) => p.id === id );

    resjson(producto);
};

module.exports = {obtenerProductos, obtenerProductosPorId};