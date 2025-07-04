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


//Simulacion de detecccion de frutas

const predictBtn = document.getElementById("predict-btn");
const predictionBox = document.getElementById("prediction");
const loading = document.getElementById("loading");

predictBtn.addEventListener("click", () => {
  loading.classList.remove("hidden");
  predictionBox.textContent = " Detectando...";
});


//Nota 1: Añadir emojis para mejor presentacion visual



//Se debera de agregar un script para cambio de color de fondo segun con lo que se detecte