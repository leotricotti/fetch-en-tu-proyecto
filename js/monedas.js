//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem("saldo");
console.log(saldoCajaOperable);

const cantidadDolares = document.getElementById("monedas-input");



const comprarDolares = (cant, valor) => {
  costoDolares = cant * valor;
  return costoDolares;
} 



async function obtenerValorDolar() {
  const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
  const resp = await fetch(URLDOLAR)
  const data = await resp.json()
  valorDolar = data.venta;
  let costoDolarComprado = comprarDolares(parseFloat(cantidadDolares.value), parseFloat(valorDolar).toFixed(2));
  return costoDolarComprado;
}



const dolaresComprados = document.getElementById("monedas-submit");

dolaresComprados.onclick = () => {
  obtenerValorDolar();
}