import{propuesta} from  '../propuesta.ts';

const obtenerTodasLasPropuestas = async (req, res) => {
  try {
    // Usa Mongoose para obtener todas las propuestas de la base de datos
    const propuestas = await Propuesta.find();

    // Envía las propuestas como respuesta al cliente
    res.status(200).json(propuestas);
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las propuestas' });
  }
};

module.exports = {
  obtenerTodasLasPropuestas,
};