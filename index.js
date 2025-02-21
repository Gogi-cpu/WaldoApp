const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'SendGrid', // O el servicio SMTP que elijas
  auth: {
    user: 'tu_usuario_smtp',
    pass: 'tu_contraseña_smtp',
  },
});

app.post('/api/enviar', async (req, res) => {
  const { nombre, fecha, lugar, cantidad, descripcion } = req.body;

  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'caja_de_correo@dominio.com',
    subject: 'Nuevo formulario recibido',
    text: `
      Nombre: ${nombre}
      Fecha: ${fecha}
      Lugar: ${lugar}
      Cantidad: ${cantidad}
      Descripción: ${descripcion}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Formulario enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el formulario' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));