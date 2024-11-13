const bcrypt = require('bcryptjs');

const storedHash = '$2b$10$yI3.8x02CMkQUIPamVGAn.KjPIbt7f.uS/LmyliqM2S6NF80TtHse'; // Hash almacenado
const plainPassword = 'saramora123'; // La contraseña que estás ingresando

bcrypt.compare(plainPassword, storedHash, (err, res) => {
  if (err) {
    console.error('Error comparando contraseñas:', err);
  } else {
    console.log('Resultado de la comparación de contraseñas:', res); // 'true' si coinciden
  }
});
