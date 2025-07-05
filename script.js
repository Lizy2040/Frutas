const webcam = document.getElementById("webcam");
const predictBtn = document.getElementById("predict-btn");
const predictionBox = document.getElementById("prediction");
const loading = document.getElementById("loading");
const historial = document.getElementById("historial");

const frutas = {
  platano: "🍌",
  naranja: "🍊"
};

const URL = "model/";
let model, maxPredictions;

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 }
    });
    webcam.srcObject = stream;

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
  } catch (err) {
    alert("Error al iniciar cámara o cargar modelo");
    console.error(err);
  }
}

predictBtn.addEventListener("click", async () => {
  loading.classList.remove("hidden");
  predictionBox.textContent = "🔍 Detectando...";
  predictionBox.className =
    "text-center text-lg font-semibold min-h-[3rem] p-4 rounded-md border-2 border-dashed shadow-inner";

  const prediction = await model.predict(webcam);
  loading.classList.add("hidden");

  let best = prediction[0];
  for (let i = 1; i < prediction.length; i++) {
    if (prediction[i].probability > best.probability) {
      best = prediction[i];
    }
  }

  // Si detecta "Nada" o probabilidad baja, no mostrar
  if (best.className === "Nada" || best.probability < 0.6) {
    predictionBox.textContent = "🤔 No se detectó fruta";
    predictionBox.className =
      "text-center text-sm italic text-gray-500 min-h-[3rem] p-4 rounded-md border border-dashed shadow-inner";
    return;
  }

  const fruta = best.className;
  const emoji = frutas[fruta] || "❓";

  // Mostrar resultado
  predictionBox.textContent = `${emoji} ${fruta}`;
  predictionBox.className =
    "text-center text-lg font-semibold min-h-[3rem] p-4 rounded-md shadow-inner";

  // Estilo y fondo por fruta
  if (fruta === "Plátano") {
    predictionBox.classList.add("bg-yellow-100", "text-yellow-800", "border-yellow-300");
    document.body.className =
      "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-yellow-200 via-yellow-100 to-lime-100";
  } else if (fruta === "Naranja") {
    predictionBox.classList.add("bg-orange-100", "text-orange-800", "border-orange-300");
    document.body.className =
      "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100";
  }

  // Historial
  const li = document.createElement("li");
  li.textContent = `${emoji} ${fruta}`;
  historial.appendChild(li);
});

window.addEventListener("DOMContentLoaded", init);
