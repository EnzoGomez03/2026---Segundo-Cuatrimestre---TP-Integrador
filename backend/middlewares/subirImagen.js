import multer from "multer";
import path from "path";

// las imagenes van a la carpeta uploads, con un nombre unico asi no se pisan
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const nombreUnico = Date.now() + "-" + Math.round(Math.random() * 10000);
        cb(null, nombreUnico + extension);
    }
});

const formatosPermitidos = ["image/jpeg","image/jpg","image/png","image/webp","image/gif"];

const filtro = (req, file, cb) => {
    if(formatosPermitidos.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const subirImagen = multer({
    storage: almacenamiento,
    fileFilter: filtro,
    limits: { fileSize: 2 * 1024 * 1024 }  // 2mb, mas que eso no hace falta
});
