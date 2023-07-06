// Función para recortar una imagen y agregar otra encima
function recortarYAgregarImagen(imagenURL, imagenSuperpuestaURL, callback) {
  // Crear un elemento de imagen para cargar la imagen original
  var imagenOriginal = new Image();
  imagenOriginal.src = imagenURL;

  // Esperar a que la imagen original se cargue
  imagenOriginal.onload = function() {
    // Crear un lienzo de dibujo
    var lienzo = document.createElement('canvas');
    var contexto = lienzo.getContext('2d');

    // Determinar el tamaño del lienzo cuadrado
    var tamaño = Math.min(imagenOriginal.width, imagenOriginal.height);
    lienzo.width = tamaño;
    lienzo.height = tamaño;

    // Recortar la imagen original y dibujarla en el lienzo
    var x = (imagenOriginal.width - tamaño) / 2;
    var y = (imagenOriginal.height - tamaño) / 2;
    contexto.drawImage(imagenOriginal, x, y, tamaño, tamaño, 0, 0, tamaño, tamaño);

    // Crear un elemento de imagen para cargar la imagen superpuesta
    var imagenSuperpuesta = new Image();
    imagenSuperpuesta.src = imagenSuperpuestaURL;

    // Esperar a que la imagen superpuesta se cargue
    imagenSuperpuesta.onload = function() {
      // Dibujar la imagen superpuesta centrada y alineada abajo en el lienzo
      var xSuperpuesta = (tamaño - imagenSuperpuesta.width) / 2;
      var ySuperpuesta = tamaño - imagenSuperpuesta.height;
      contexto.drawImage(imagenSuperpuesta, xSuperpuesta, ySuperpuesta);

      // Obtener la URL de la nueva imagen resultante
      var nuevaImagenURL = lienzo.toDataURL();

      // Llamar a la función de devolución de llamada con la nueva imagen URL
      callback(nuevaImagenURL);
    };
  };
}

// Ejemplo de uso
var imagenURL = window.AppInventor.getWebViewString();
var imagenSuperpuestaURL = '= "marco.png";';

recortarYAgregarImagen(imagenURL, imagenSuperpuestaURL, function(nuevaImagenURL) {
  // Aquí puedes usar la nueva imagen URL, por ejemplo, para mostrarla en una página web
  var nuevaImagen = document.createElement('img');
window.AppInventor.setWebViewString( nuevaImagenURL ) 
 nuevaImagen.src = nuevaImagenURL;
  document.body.appendChild(nuevaImagen);
});
