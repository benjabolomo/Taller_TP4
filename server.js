require('dotenv').config();
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            // Pasamos el error al middleware de Express
            return next(err);
        }
        res.send(data);
    });
});

// Middleware centralizado para manejo de errores
app.use((err, req, res, next) => {
    if (err.code === 'ENOENT') {
        return res.status(404).send('Error 404: Archivo index.html no encontrado');
    }
    res.status(500).send('Error 500: Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});