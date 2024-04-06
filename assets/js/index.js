// variables a utilizar
const inputText = document.getElementById("txtClp");
const element1 = document.getElementById("cambio");

function dolar() {
  async function traerDolar() {
    try {
      const res = await fetch("https://mindicador.cl/api");
      const data = await res.json();
      const element = document.querySelector(".resultadoCambio");
      element.innerHTML =
        inputText.value / 0.0011 / parseFloat(data.dolar["valor"]);
    } catch (error) {
      message();
    }
  }
  traerDolar();
}

function euro() {
  async function traerEuro() {
    try {
      const res = await fetch("https://mindicador.cl/api");
      const data = await res.json();
      const element = document.querySelector(".resultadoCambio");
      element.innerHTML =
        inputText.value / 0.00097 / parseFloat(data.euro["valor"]);
    } catch (error) {
      message();
    }
  }
  traerEuro();
}

function message() {
  swal(
    "Atención!",
    "Estamos Presentado Problemas con la base de Datos!",
    "error"
  );
}

function messageVacio() {
  swal("Atención!", "Debe ingresar un valor en el campo en Blanco!", "info");
}

function btnCambio() {
  if (inputText.value == "") {
    messageVacio();
    inputText.focus();
  } else {
        if (element1.value == "Dolar") {
        dolar();
        console.log("Dolar")
      } else if (element1.value == "Euro") {
        euro();
        console.log("Euro")
      }
  }
  inputText.focus();
}

// codigo gráfico
async function getMonedas() {
  const endpoint = "https://mindicador.cl/api/euro";
  const res = await fetch(endpoint);
  const monedas = await res.json();
  return monedas;
}

function prepararConfiguracionParaLaGrafica(monedas) {
  // Creamos las variables necesarias para el objeto de configuración
  const tipoDeGrafica = "line";
  const nombresDeLasMonedas = monedas.map((moneda) => moneda.euro["valor"]);
  const titulo = "Monedas";
  const colorDeLinea = "red";
  const valores = monedas.map((moneda) => {
    const valor = moneda.Valor.replace(",", ".");
    return Number(valor);
  });
  // Creamos el objeto de configuración usando las variables anteriores
  const config = {
    type: tipoDeGrafica,
    data: {
      labels: nombresDeLasMonedas,
      datasets: [
        {
          label: titulo,
          backgroundColor: colorDeLinea,
          data: valores,
        },
      ],
    },
  };
  return config;
 }

async function renderGrafica() {
  const monedas = await getMonedas();
  const config = prepararConfiguracionParaLaGrafica(monedas);
  const chartDOM = document.getElementById("myChart");
  new Chart(chartDOM, config);
}
 renderGrafica();
