const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Cancer', 'Non-cancer'];

    const classResult = confidenceScore > 50 ? 0 : 1;
    const label = classes[classResult];

    let suggestion;

    if (label === 'Non-cancer') {
      suggestion = "Segera konsultasi ke dokter terdekat jika ukuran semakin membesar dengan cepat, mudah luka, atau berdarah!"
    }

    if (label === 'Cancer') {
      suggestion = "Segera periksa ke dokter!"
  
    }

    return { label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;