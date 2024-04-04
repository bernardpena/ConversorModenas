// variables a utilizar
const inputText = document.querySelector("#txtClp");
const element1 = document.getElementById("cambio");

function carga() {
  if (inputText.value !== "") {
    llamada();
  } else {
    messageVacio();
    inputText.focus();
  }
  inputText.focus();
}

function llamada() {
  //   const element1 = document.getElementById("cambio");
  element1.addEventListener("click", function dolar() {
    if (element1.value == "Dolar") {
      async function getSomething() {
        try {
          const res = await fetch("https://mindicador.cl/api");
          const data = await res.json();
          const element = document.querySelector(".prueba");
          element.innerHTML = data.dolar["valor"];
        } catch (error) {
          message();
        }
      }
      getSomething();
    } else if (element1.value == "Euro") {
      async function getSomething() {
        try {
          const res = await fetch("https://mindicador.cl/api");
          const data = await res.json();
          const element2 = document.querySelector(".prueba");
          element2.innerHTML = data.euro["valor"];
        } catch (error) {
          message();
        }
      }
      getSomething();
    }
  });
}

llamada();

function message() {
  swal(
    "Atención!",
    "Al parecer hay un problema con la base de Datos!",
    "error"
  );
}

function messageVacio() {
  swal("Atención!", "Debe ingresar un valor en el campo en Blanco!", "error");
}
