//Funcion que al consultar el saldo devuelve una tabla con el saldo de las cuentas bancarias simuladas
function cotizarDolar() {
  let text = document.querySelector(".text");
  text.innerText = "Cotizacion del dolar al instante";
  //Código que crea el elemento tabla y le asigna sus clases
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
      <thead>
        <tr>
          <th class="col-2">Fecha</th>
          <th class="col-6">Moneda</th>
          <th class="col-2">Compra</th>
          <th class="col-2">Venta</th>
        </tr>
      </thead>
    `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su columna
  async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const resp=await fetch(URLDOLAR)
    const data=await resp.json()
    tableBody.innerHTML = (`
        <tr>
          <td>${new Date().toLocaleDateString()}</td>
          <td>Dolar</td>
          <td>${data.compra}</td>
          <td>${data.venta}</td>
        </tr>
      `);
  }
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
  obtenerValorDolar();
}
const dolar = document.getElementById("btn-dolar");
dolar.onclick = () => {
  cotizarDolar();
}