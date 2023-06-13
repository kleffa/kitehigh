window.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('video-background');
    const captureButton = document.getElementById('capture-button');
    const canvasElement = document.getElementById('canvas');
    const context = canvasElement.getContext('2d');

    let mediaStream;

    // Verificar si el navegador es compatible con getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                mediaStream = stream;
                videoElement.srcObject = mediaStream;
            })
            .catch((error) => {
                console.error('Error al acceder a la cámara: ', error);
            });
    } else {
        console.error('getUserMedia no es soportado por el navegador');
    }

    captureButton.addEventListener('click', () => {
        if (mediaStream) {
            // Capturar imagen del video y mostrarla en el canvas
            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            // Obtener la imagen como base64
            const imageData = canvasElement.toDataURL('image/jpeg');

            // Mostrar la imagen capturada (puedes ajustar esto según tus necesidades)
            const imageElement = new Image();
            imageElement.src = imageData;
            document.body.appendChild(imageElement);
        }
    });
});
