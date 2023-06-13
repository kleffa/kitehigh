//script.js
window.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('video-background');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })


    // Verificar si el navegador es compatible con getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // Asignar el stream de la cámara al elemento de video
                videoElement.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error al acceder a la cámara: ', error);
            });
    } else {
        console.error('getUserMedia no es soportado por el navegador');
    }
});
