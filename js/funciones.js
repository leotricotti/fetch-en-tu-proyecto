//Codigo que crea la variable donde se almacenará el saldo simulado
let saldoCajaAhorro = (localStorage.getItem("saldo"));
//Operador avanzado que verifica si existe el objeto saldo, si no es así lo crea
saldoCajaAhorro == null && localStorage.setItem("saldo", 150000);
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
