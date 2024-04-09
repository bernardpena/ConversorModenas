// variables a utilizar
const inputText = document.getElementById("txtClp");
const element = document.querySelector(".resultadoCambio");
const element1 = document.getElementById("cambio");

function dolar() {
  async function traerDolar() {
    try {
      const res = await fetch("https://mindicador.cl/api");
      const data = await res.json();
      resultado = parseFloat(inputText.value) / parseFloat(data.dolar["valor"]); // 0.0011 /
      element.innerHTML = "$ " + resultado.toFixed(2);
      let graficaValor = data.codigo;
      console.log(res + "/" + graficaValor + "/");
      graficos2();
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
      resultado = parseFloat(inputText.value) / parseFloat(data.euro["valor"]); // 0.00097 /
      element.innerHTML = "$ " + +resultado.toFixed(2);
      let graficaValor = data.codigo;
      console.log(res + "/" + graficaValor + "/");
      graficos2();
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

function messageChart(error) {
  swal(
    "Atención!",
    "Estamos Presentado Problemas con la base de Datos para generar el Gráfico",
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
    } else if (element1.value == "Euro") {
      euro();
    }
  }
  inputText.focus();
}

function graficos2() {
  async function getMonedas() {
    if (element1.value == "Dolar") {
      const endpoint = "https://mindicador.cl/api/dolar";
      const res = await fetch(endpoint);
      const monedas = await res.json();
      return monedas;
    } else if (element1.value == "Euro") {
      const endpoint = "https://mindicador.cl/api/euro";
      const res = await fetch(endpoint);
      const monedas = await res.json();
      return monedas;
    }
  }

  function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.serie.map((moneda) => {
      const valor = moneda.fecha;
      return valor.slice(0, 10);
    });
    const titulo = monedas.codigo;
    const colorDeLinea = "red";
    const valores = monedas.serie.map((moneda) => {
      const valor = moneda.valor;
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
    try {
      const monedas = await getMonedas();
      const config = prepararConfiguracionParaLaGrafica(monedas);
      const chartDOM = document.getElementById("myChart");
      new Chart(chartDOM, config);
    } catch (error) {
      messageChart(error);
      console.log(`Error al generar la gráfica: ${error}`);
    }
  }
  renderGrafica();
}
