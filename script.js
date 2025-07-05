const webcam = document.getElementById("webcam");
const predictBtn = document.getElementById("predict-btn");
const predictionBox = document.getElementById("prediction");
const loading = document.getElementById("loading");
const historial = document.getElementById("historial");
const reiniciarBtn = document.getElementById("reiniciar-btn");

const frutas = {
  Pera: "🍐",
  Plátano: "🍌",
  Manzana: "🍎"
};

async function init() {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcam.srcObject = stream;
  } catch (err) {
    alert("No se pudo acceder a la cámara");
    console.error("Error al acceder a la cámara:", err);
  }
}

init();

predictBtn.addEventListener("click", () => {
  loading.classList.remove("hidden");
  predictionBox.textContent = "🔍 Detectando...";
  predictionBox.className =
    "text-center text-lg font-semibold min-h-[3rem] p-4 rounded-md border-2 border-dashed shadow-inner";

  setTimeout(() => {
    loading.classList.add("hidden");

    const opciones = ["Pera", "Plátano", "Manzana"];
    const fruta = opciones[Math.floor(Math.random() * opciones.length)];
    const emoji = frutas[fruta] || "❓";

    predictionBox.className =
      "text-center text-lg font-semibold min-h-[3rem] p-4 rounded-md shadow-inner";

    if (fruta === "Pera") {
      predictionBox.classList.add("bg-lime-100", "text-lime-800", "border-lime-300");
      document.body.className =
        "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-lime-300 via-green-100 to-yellow-100";
    } else if (fruta === "Plátano") {
      predictionBox.classList.add("bg-yellow-100", "text-yellow-800", "border-yellow-300");
      document.body.className =
        "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-yellow-200 via-yellow-100 to-lime-100";
    } else if (fruta === "Manzana") {
      predictionBox.classList.add("bg-red-100", "text-red-800", "border-red-300");
      document.body.className =
        "min-h-screen flex items-center justify-center p-6 transition-all bg-gradient-to-br from-red-200 via-red-100 to-yellow-100";
    }

    predictionBox.textContent = `${emoji} ${fruta}`;

    const li = document.createElement("li");
    li.textContent = `${emoji} ${fruta}`;
    historial.appendChild(li);
  }, 1500);
});

reiniciarBtn.addEventListener("click", () => {
  predictionBox.textContent = "Esperando predicción...";
  predictionBox.className =
    "border-2 border-dashed border-green-400 bg-green-50 text-green-700 p-4 rounded-md text-center text-lg font-semibold shadow-inner min-h-[3rem]";
  historial.innerHTML = "";
  document.body.className =
    "bg-gradient-to-br from-lime-400 via-yellow-200 to-orange-400 min-h-screen flex items-center justify-center p-6";
});