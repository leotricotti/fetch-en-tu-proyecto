//Funcion que carga la funcion que inyecta la tabla con la cotizacion del dolar en tiempo real
window.onload = () => {
  obtenerValorDolar();
}
//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem("saldo");
//Funcion que convierte el dato recuperado del localstorage a numero
const convertirStorageANumero = () => parseFloat(saldoCajaOperable);
//Variables necesarias para operar
let valorDolarCompra;
let valorDolarVenta;
let costoDolarComprado;
//Codigo que captura el campo para ingresar los dolares que se desean comprar
const cantidadDolares = document.getElementById("monedas-input");
//Codigo que captura el boton que confirma la operacion
const dolaresComprados = document.getElementById("monedas-submit");
//Codigo que captura el boton que modifica el valor ingresado
const clean = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input en caso de que el usuario quiera modificar el importe a depositar
clean.onclick = () => {
  cantidadDolares.value = "";
};
//Funcion que calcula la compra de dolares
const comprarDolares = () => {
  costoDolarComprado = (
    parseFloat(cantidadDolares.value) * parseFloat(valorDolarVenta)
  ).toFixed(2);
  return costoDolarComprado;
};
//Funcion que coinvierte un numero al formato a dolar
const numeroADolar = (dinero) => {
  return (dinero = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "name",
  }).format(dinero));
}
//Funcion que inyecta la tabla con la cotizacion del dolar en tiempo real
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
          <td>${numeroADinero(valorDolarCompra)}</td>
          <td>${numeroADinero(valorDolarVenta)}</td>
        </tr>
      `;
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
};
//Funcion que obtiene el valor del dolar blue en tiempo real
async function obtenerValorDolar() {
  const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
  const resp = await fetch(URLDOLAR);
  const data = await resp.json();
  valorDolarCompra = data.compra;
  valorDolarVenta = data.venta;
  mostrarCotizacion();
  comprarDolares();
}
//Funcion que dispara un alert que confirma o cancela la operación
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea adquirir ${numeroADolar(cantidadDolares.value)} a ${numeroADinero(comprarDolares())} ?`,
    confirmButtonText: 'Save',
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__fadeIn",
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Operación realizada con exito. Su saldo es ' + convertirSaldoADinero(), '', 'success'
      ).then(function () {
        window.location.href = "../opcion/opcion.html";
        //Llamada a las funciones
        actualizarSaldoStorage(); 
        almacenarOperacion(crearOperacion());
      })
    } else if (result.isDismissed) {
      Swal.fire(
        'Operación cancelada', '', 'info'
      ).then(function () {
        window.location.href = "../opcion/opcion.html";
      })
    }
  })
}
//Funcion que comprueba si el usuario compra la cantidad permitida de dolares mensuales y opera en consecuencia
dolaresComprados.onclick = () => {
  if ((cantidadDolares.value > 0) && (cantidadDolares.value < 200)){
    confirmarOperacion();
    
  } else {
  //Codigo que devuelve un alert si la opcion ingresada es invalida
    Swal.fire({
      icon: "warning",
      title: "Ingrese una opción valida",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
    });
  }
}
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Compra dolares";
//Codigo que actualiza el saldo de la caja de ahorro simulada
const actualizarSaldoCajaAhorro = () => {
  saldoCajaAhorro = convertirStorageANumero() - comprarDolares();
  return saldoCajaAhorro;
}

function escribirJson(){
  fetch('../json/operaciones.json')
      .then( (res) => res.json())
      .then( (data) => {
      operacion = actualizarJson();
      console.log(operacion);
      });
}

console.log(crearOperacion());