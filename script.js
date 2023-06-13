window.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('video-background');
    const canvasElement = document.getElementById('canvas');
    const context = canvasElement.getContext('2d');

    let mediaStream;

    // Verificar si el navegador es compatible con getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                mediaStream = stream;
                videoElement.srcObject = mediaStream;
                videoElement.play();
            })
            .catch((error) => {
                console.error('Error al acceder a la cámara: ', error);
            });
    } else {
        console.error('getUserMedia no es soportado por el navegador');
    }

    videoElement.addEventListener('play', () => {
        const drawFrame = () => {
            if (videoElement.paused || videoElement.ended) {
                return;
            }

            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            requestAnimationFrame(drawFrame);
        };

        requestAnimationFrame(drawFrame);
    });
});
