let valorDolar;
//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem("saldo");

const cantidadDolares = document.getElementById("monedas-input");

let costoDolarComprado;

const comprarDolares = (cant, valor) => {
  costoDolares = cant * valor;
  return costoDolares;
};

const mostrarCotizacion = () => {
  //Código que crea el elemento tabla y le asigna sus clases
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Moneda</th>
            <th scope="col">Compra</th>
            <th scope="col">Venta</th>
          </tr>
        </thead>
      `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su columna
  tableBody.innerHTML += `
        <tr>
          <td>${new Date().toLocaleDateString()}</td>
          <td>${new Date().toLocaleTimeString()}</td>
          <td>Dolar Estadounidense</td>
          <td>${numeroAPesos(valorDolar)}</td>
          <td>${numeroAPesos(valorDolar)}</td>
        </tr>
      `;
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
}

async function obtenerValorDolar() {
  const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
  const resp = await fetch(URLDOLAR);
  const data = await resp.json();
  valorDolarCompra = data.compra;
  valorDolarVenta = data.venta;  
  costoDolarComprado = comprarDolares((parseFloat(cantidadDolares.value), parseFloat(valorDolar)).toFixed(2));
  mostrarCotizacion();
}


const dolaresComprados = document.getElementById("monedas-submit");


dolaresComprados.onclick = () => {
  obtenerValorDolar();
};
