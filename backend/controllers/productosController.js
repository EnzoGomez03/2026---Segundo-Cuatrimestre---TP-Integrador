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

module.exports = {obtenerProductos}