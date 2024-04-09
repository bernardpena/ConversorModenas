// variables a utilizar
const inputText = document.getElementById("txtClp");
const element = document.querySelector(".resultadoCambio");
const element1 = document.getElementById("cambio");

function tipoDivisa() {
  if (element1.value == "Dolar") {
    console.log("tipo de divisa Dolar");
    async function traerDolar() {
      try {
        const res = await fetch("https://mindicador.cl/api");
        const data = await res.json();
        resultado =
          parseFloat(inputText.value) / parseFloat(data.dolar["valor"]);
        element.innerHTML = "$ " + resultado.toFixed(2) + " usd";
        graficos2();
      } catch (error) {
        message();
      }
    }
    traerDolar();
  } else if (element1.value == "Euro") {
    console.log("tipo de divisa Euro");
    async function traerEuro() {
      try {
        const res = await fetch("https://mindicador.cl/api");
        const data = await res.json();
        resultado =
          parseFloat(inputText.value) / parseFloat(data.euro["valor"]); // 0.00097 /
        element.innerHTML = "$ " + resultado.toFixed(2) + " eur";
        graficos2();
      } catch (error) {
        message();
      }
    }
    traerEuro();
  }
}

// function dolar() {
//   async function traerDolar() {
//     try {
//       const res = await fetch("https://mindicador.cl/api");
//       const data = await res.json();
//       resultado = parseFloat(inputText.value) / parseFloat(data.dolar["valor"]);
//       element.innerHTML = "$ " + resultado.toFixed(2);
//       graficos2();
//     } catch (error) {
//       message();
//     }
//   }
//   traerDolar();
// }

// function euro() {
//   async function traerEuro() {
//     try {
//       const res = await fetch("https://mindicador.cl/api");
//       const data = await res.json();
//       resultado = parseFloat(inputText.value) / parseFloat(data.euro["valor"]); // 0.00097 /
//       element.innerHTML = "$ " + resultado.toFixed(2);
//       graficos2();
//     } catch (error) {
//       message();
//     }
//   }
//   traerEuro();
// }

function message() {
  swal(
    "Atención!",
    "Estamos Presentado Problemas con la base de Datos!",
    "error"
  );
}

function messageChart() {
  swal(
    "Atención!",
    "Estamos Presentado Problemas con la base de Datos para generar el Gráfico",
    "error"
  );
}

function messageVacio() {
  swal("Atención!", "Debe ingresar un valor en el campo en Blanco!", "info");
}

function refresh() {
  element1.refresh;
}

function btnCambio() {
  if (inputText.value == "") {
    messageVacio();
    inputText.focus();
  } else {
    if (element1.value == "Dolar") {
      // dolar();
      tipoDivisa();
    } else if (element1.value == "Euro") {
      // euro();
      tipoDivisa();
    }
  }
  inputText.focus();
}

function graficos2() {
  async function getMonedas() {
    if (element1.value == "Dolar") {
      let endpoint = "https://mindicador.cl/api/dolar";
      const res = await fetch(endpoint);
      const monedas = await res.json();
      return monedas;
    } else if (element1.value == "Euro") {
      console.log(endpoint);
      let endpoint = "https://mindicador.cl/api/euro";
      const res = await fetch(endpoint);
      const monedas = await res.json();
      return monedas;
    }
    // renderGrafica();
  }

  function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.serie.map((moneda) => {
      const valor = moneda.fecha;
      return valor.slice(0, 20);
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
