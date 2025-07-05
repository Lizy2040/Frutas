// agarrar los elementos del html
const webcam = document.getElementById("webcam");
const predictBtn = document.getElementById("predict-btn");
const predictionBox = document.getElementById("prediction");
const loading = document.getElementById("loading");
const historial = document.getElementById("historial");

// emojis segun fruta
const frutas = {
  platano: "🍌",
  naranja: "🍊"
};

// ruta del modelo
const URL = "model/";
let model, maxPredictions;

// iniciar camara y cargar modelo
async function init() {
  try {
    // prender camara
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 }
    });
    webcam.srcObject = stream;

    // cargar modelo entrenado
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
  } catch (err) {
    alert("Error al iniciar camara o cargar modelo");
    console.error(err);
  }
}

// cuando se hace click en predecir
predictBtn.addEventListener("click", async () => {
  loading.classList.remove("hidden");
  predictionBox.textContent = "🔍 Detectando...";
  predictionBox.className =
    "text-center text-lg font-semibold min-h-[3rem] p-4 rounded-md border-2 border-dashed shadow-inner";

  // hacer la prediccion con la camara
  const prediction = await model.predict(webcam);
  loading.classList.add("hidden");

  // buscar la clase con mayor probabilidad
  let best = prediction[0];
  for (let i = 1; i < prediction.length; i++) {
    if (prediction[i].probability > best.probability) {
      best = prediction[i];
    }
  }

  // si dice "Nada" o la confianza es baja, no mostrar fruta
  if (best.className === "Nada" || best.probability < 0.6) {
    predictionBox.textContent = "🤔 No se detecto fruta";
    predictionBox.className =
      "text-center text-sm italic text-gray-500 min-h-[3rem] p-4 rounded-md border border-dashed shadow-inner";
    return;
  }

  const fruta = best.className;
  const emoji = frutas[fruta] || "❓";

  // mostrar resultado en pantalla
predictionBox.textContent = `${emoji} ${fruta} (${(best.probability * 100).toFixed(1)}%)`;

  predictionBox.className =
    "text-center text-lg font-semibold min-h-[3rem] p-4 rounded-md shadow-inner";

  // cambiar fondo segun fruta
  if (fruta === "platano") {
    predictionBox.classList.add("bg-yellow-100", "text-yellow-800", "border-yellow-300");
    document.body.className =
      "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-yellow-200 via-yellow-100 to-lime-100";
  } else if (fruta === "naranja") {
    predictionBox.classList.add("bg-orange-100", "text-orange-800", "border-orange-300");
    document.body.className =
      "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100";
  }

  // agregar al historial
  const li = document.createElement("li");
  li.textContent = `${emoji} ${fruta}`;
  historial.appendChild(li);
});

// cuando carga la pagina, inicia camara y modelo
window.addEventListener("DOMContentLoaded", init);
