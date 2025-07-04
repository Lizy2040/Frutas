const URL = "./model/";
let model, webcam, maxPredictions;

const predictBtn = document.getElementById("predict-btn");
const predictionBox = document.getElementById("prediction");
const loadingText = document.getElementById("loading");
const historyList = document.getElementById("historial");
const videoElement = document.getElementById("webcam");

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(300, 300, true);
    await webcam.setup();
    await webcam.play();

    videoElement.srcObject = webcam.webcam;
    videoElement.addEventListener("loadeddata", () => {
        webcam.update();
    });

    console.log("Modelo y cámara web listos");
} 

async function predict() {
    loadingText.classList.remove("hidden");
    predictionBox.textContent = "Procesando...";

    webcam.update();
    const prediction = await model.predict(webcam.canvas);

    let topClass = "";
    let topProbability = 0;

    prediction.forEach((p) => {
        if (p.probability > topProbability) {
            topProbability = p.probability;
            topClass = p.className;
        }
    });

    const porcentaje = (topProbability * 100).toFixed(1);
    predictionBox.textContent = `Fruta detectada: ${topClass} (${porcentaje}%)`;

    const li = document.createElement("li");
    li.textContent = `${new Date().toLocaleTimeString()} → ${topClass} (${porcentaje}%)`;
    historyList.prepend(li);

    loadingText.classList.add("hidden");
}

predictBtn.addEventListener("click", predict);

init();