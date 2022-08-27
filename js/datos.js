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
//Creacion del array que va a contener a las operaciones bancarias previamente simuladas
const operaciones = [];
//Creacion del array que va a contener las cuentas simuladas
const cuentas = [];
//Funcion que carga las oeraciones bancarias simuladas al array de operaciones 
function cargarOperaciones(){
  operaciones.push(new Operacion("08/07/2022", "15:55:02", "Deposito", "$ 15.000.00", "$ 125.343.00"));
  operaciones.push(new Operacion("17/07/2022", "12:34:23", "Deposito", "$ 30.000.00","$ 155.343.00" ));
  operaciones.push(new Operacion("10/07/2022", "12:18:54", "Deposito", "$ 20.000.00", "$ 115.343.00"));
  operaciones.push(new Operacion("01/07/2022", "11:25:45", "Pago Servicio", "$ 2.572.27", "$ 130.253.65"));
  operaciones.push(new Operacion("05/07/2022", "10:33:32", "Pago Servicio", "$ 5.362.87", "$ 127.156.65"));
  operaciones.push(new Operacion("17/07/2022", "08:55:08", "Pago Servicio", "$ 1.942.63", "$ 122.165.36"));
  operaciones.push(new Operacion("14/07/2022", "15:55:17", "Extraccion", "$ 15.000.00", "$ 125.343.54"));
  operaciones.push(new Operacion("03/07/2022", "12:34:32", "Extraccion", "$ 30.000.00", "$ 95.343.00"));
  operaciones.push(new Operacion("20/07/2022", "12:18:25", "Extraccion", "$ 20.000.00", "$ 115.343.00"));
  operaciones.push(new Operacion("22/07/2022", "18:55:12", "Transferencia", "$ 25.000.00", "$ 95.343.00"));
  operaciones.push(new Operacion("19/07/2022", "12:34:58", "Transferencia", "$ 22.000.00", "$ 144.343.00"));
  operaciones.push(new Operacion("27/07/2022", "12:18:21", "Transferencias", "$ 20.000.00", "$ 123.343.56"));
}
//Llamada a la funcion
cargarOperaciones();
//Funcion que permite ordenar por fecha de realización a las operaciones simuladas
let operacionesOdenadas = operaciones.sort((a, b) => {
  if (a.fecha < b.fecha) {
    return 1;
  }
  if (a.fecha > b.fecha) {
    return -1;
  }
});
//Funcion que coinvierte un numero al formato de pesos argentinos
numeroAPesos = (dinero) => {
  return (dinero = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(dinero));
}
//Funcion que carga los objetos literales que contienen la informacion de las cuentas bancarias simuladas al array de cuentas
function cargarCuentas() {
  cuentas.push({tipo: "Caja de Ahorro", moneda: "$", cuenta: "5069-5689756/4", identificador: "Cuenta", saldo: `${numeroAPesos(saldoCajaAhorro)}`});
  cuentas.push({tipo: "Cta Corriente", moneda: "$", cuenta: "5069-5689652/4", identificador: "Cuenta", saldo: "$ 200.000,00"});
  cuentas.push({tipo: "Caja de Ahorro", moneda: "USD", cuenta: "5069-5685686/4", identificador: "Cuenta", saldo: "USD 5.000,00"});
}  
//LLamada a la funcion
cargarCuentas();
//Funcion que convierte la informacion a JSON y la guarda en el localstorage para luego ser recuperada
const guardarLocal = (clave, valor) => localStorage.setItem(clave, valor);
//Llamadas a la funcion para guardar los datos necesarios para iniciar el programa
guardarLocal("cuentas", JSON.stringify(cuentas));
guardarLocal("operacionesOrdenadas", JSON.stringify(operacionesOdenadas));


