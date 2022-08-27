//Funcion que captura el saldo almacenado en el json cuentas y lo inserta en el local storage 
function capturarSaldo(){fetch("../../json/cuentas.json")
  .then((resp) => resp.json())
  .then((data) => {
    let saldo = data[0].saldo;
    let saldoCajaAhorro = (localStorage.getItem("saldo"));
    saldoCajaAhorro == null && localStorage.setItem("saldo", saldo);
})}
//Llamada a la funcion 
capturarSaldo();
//Constructor que crea los objetos que van a  simular las operaciones bancarias realizadas por el usuario en el último mes
class Operacion {
  constructor(fecha, hora, operacion, monto, saldo) {
    this.fecha = fecha;
    this.hora = hora;
    this.operacion = operacion;
    this.monto = monto;
    this.saldo = saldo;
  }
}
//Funcion que carga las oeraciones bancarias simuladas al json operaciones
function cargarOperaciones(json, array){
  json.unshift(new Operacion(array));
}
//Funcion que coinvierte un numero al formato de pesos argentinos
numeroAPesos = (dinero) => {
  return (dinero = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(dinero));
}

