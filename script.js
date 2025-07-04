const webcam = document.getElementById("webcam");

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcam.srcObject = stream;
    } catch (err) {
        alert("No se pudo acceder a la cámara");
        console.error("Error al acceder a la cámara:", err);
    }
}

initCamera();
