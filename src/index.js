import validator from "./validator.js"; //importamos el archivo Validator.js para hacer las validaciones y el maskify
let div = document.getElementById("container"); //Obtenemos el Div donde está nuestro formulario para futuro trabajar con él
document.getElementById("btnGo").addEventListener("click", function () { //Agregamos un listener al nuestro botón "Go", al hacer click realizará varias acciones
  /*

    Obtener todos los datos de los input como, Número de la tarjeta, Nombre de la tarjeta, CVC y Fecha de expiración

  */

  let numCard = document.getElementById("cardNumber").value;//Obtenemos el valor del input de la tarjeta al momento de dar click en el botón "Go"
  let ownerName = document.getElementById("owner").value;//Obtenemos el valor del input del nombre de la tarjeta al momento de dar click en el botón "Go"
  let numCvc = document.getElementById("cvc").value;//Obtenemos el valor del input del cvc al momento de dar click en el botón "Go"
  let expirationDate = document.getElementById("expiration").value;//Obtenemos el valor del input de la fecha de expiración al momento de dar click en el botón "Go"
  
  /*

    Validar los datos de los inputs anteriormente obtenidos

  */

  let numCardState = numCardValidate(numCard);//Llamamos a la función "numCardValidate" y le pasamos como parametro el número de la tarjeta, esto nos devolverá un valor "true" o "false" y lo guardaremos en la variable "numCardState"
  let ownerNameState = ownerNameValidate(ownerName);//Llamamos a la función "ownerNameValidate" y le pasamos como parametro el nombre de la tarjeta, esto nos devolverá un valor "true" o "false" y lo guardaremos en la variable "ownerNameState"
  let numCvcState = numCvcValidate(numCvc);//Llamamos a la función "numCvcState" y le pasamos como parametro el CVC, esto nos devolverá un valor "true" o "false" y lo guardaremos en la variable "numCvcState"
  let expirationDateState = expirationDateValidate(expirationDate);//Llamamos a la función "expirationDateValidate" y le pasamos como parametro la fecha de expiración de la tarjeta, esto nos devolverá un valor "true" o "false" y lo guardaremos en la variable "expirationDateState"

  /*

    Condiciones para seguir con la validación de nuestra tarjeta

  */

  if (validator.isValid(numCard)) { //Hacemos una condición preguntando si lo retornado por nuestra función isValid, del objeto "validator" con el parametro "numCard" (Numero de la tarjeta), es "true" o "false", si es true se ejecutará el código dentro de nuestro bloque
    if (numCardState && ownerNameState && numCvcState && expirationDateState) { //Hacemos una condición preguntando si las validaciones que hicimos anteriormente son "true", si son "true" se ejecutará el código dentro de nuestro bloque
      //Insertamos dentro nuestro elemento "div" con "innerHTML", la confirmación de nuestra compra cuando nuestra tarjeta sea válida, y el resto de nuestros input también, nombre de la tarjeta, cvc y fecha de expiración
      div.innerHTML = `<div class="validate"><p>${ownerName}, su compra ha sido exitosa</p>
      <p>Método de pago: Tarjeta de credito ${validator.maskify(numCard)}
      <a href="./index.html">Finalizar compra</a></div>
      `;
    }
  } else { //Si nuestra función "isValid" es "false" se ejecutará lo siguiente
    document.getElementById("cardValid").innerHTML = "Su tarjeta no es válida"; //Insertaremos dentro de nuestre elemento "cardValid", un texto diciendo que no es válida la tarjeta, y no procederá nuestra compra
  }
});

/*

Funciones para validar todos nuestros input

*/

function numCardValidate(cardNumber) { //Función "numCardValidate" y con el parámetro "cardNumber"
  if (cardNumber == "") { // Si el parámetro "cardNumber" está vacio, se ejecutará el código
    document.getElementById("cardValid").innerHTML =
      "Este campo es obligatorio"; //Insertamos el texto dentro de nuestro elemento "cardValid"
    return false; //Devolvemos false ya que no es lo que esperamos
  } else if (cardNumber.length < 16 || cardNumber.length > 16) { //Si la longitud del valor dentro del parámetro es menor que 16 o mayor que 16, se ejecutará el código
    document.getElementById("cardValid").innerHTML =
      "La tarjeta debe tener 16 números"; //Insertamos el texto dentro de nuestro elemento "cardValid"
    return false; //Devolvemos false ya que no es lo que esperamos
  } else if (cardNumber < 0) { //Si el valor dentro el parámetro "cardNumber" es menor que 0, es decir, negativo, ejecutará el código
    document.getElementById("cardValid").innerHTML =
      "No pueden ser números negativos"; //Insertamos el texto dentro de nuestro elemento "cardValid"
    return false; //Devolvemos false ya que no es lo que esperamos
  } else { //Si no es ninguna de las anteriores condiciones, se ejecutará el código
    document.getElementById("cardValid").innerHTML = ""; //Al ser correcta la validación, quitamos cualquier texto que haya dentro de nuestro elemento "cardValid"
    return true; //Devolvemos "true", pues es lo que esperamos
  }
}


function ownerNameValidate(ownerName) { //Función "ownerNameValidate" y con el parámetro "ownerName"
  if (ownerName == "") { //Si el parámetro "ownerName" está vacio, se ejecutará el código
    document.getElementById("nameValid").innerHTML =
      "Este campo es obligatorio"; //Insertamos el texto dentro de nuestro elemento "nameValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else {//Si no es ninguna de las anteriores condiciones, se ejecutará el código
    document.getElementById("nameValid").innerHTML = "";//Al ser correcta la validación, quitamos cualquier texto que haya dentro de nuestro elemento "nameValid"
    return true;//Devolvemos "true", pues es lo que esperamos
  }
}


function numCvcValidate(numCvc) { //Función "numCvcValidate" y con el parámetro "numCvc"
  if (numCvc == "") {//Si el parámetro "numCvc" está vacio, se ejecutará el código
    document.getElementById("cvcValid").innerHTML = "Este campo es obligatorio"; //Insertamos el texto dentro de nuestro elemento "cvcValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else if (numCvc > 999 || numCvc < 100 || numCvc.length > 3 || numCvc.length < 3) { //Si "numCvc" es mayor que 999 o menor que 100 o tiene más de 3 digitos o tiene menos de 3 digito  se ejecutará el código
    document.getElementById("cvcValid").innerHTML =
      "El CVC debe tener 3 digitos";//Insertamos el texto dentro de nuestro elemento "nameValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else {//Si no es ninguna de las anteriores condiciones, se ejecutará el código
    document.getElementById("cvcValid").innerHTML = "";//Al ser correcta la validación, quitamos cualquier texto que haya dentro de nuestro elemento "numCvc"
    return true;//Devolvemos "true", pues es lo que esperamos
  }
}


function expirationDateValidate(expirationDate) { //Función "expirationDateValidate" y con el parámetro "expirationDate"
  if (expirationDate == "") {//Si el parámetro "expirationDate" está vacio, se ejecutará el código
    document.getElementById("expirationValid").innerHTML =
      "Este campo es obligatorio";//Insertamos el texto dentro de nuestro elemento "expirationValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else if (expirationDate.length > 5 || expirationDate.length < 5) { //Si la longitud de "expirationDate" es mayor a 5 o menor a 5, se ejecutará el código
    document.getElementById("expirationValid").innerHTML =
      "La fecha es incorrecta"; //Insertamos el texto dentro de nuestro elemento "expirationValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else if (
    expirationDate.substr(0, 2) > 12 ||
    expirationDate.substr(0, 2) < 1 ||
    expirationDate.substr(-2) < 21
  ) { //Si los primeros dos digitos son mayores que 12 o menor que 1 o los dos últimos digitos menores que 21, ejecutará el código
    document.getElementById("expirationValid").innerHTML =
      "El mes o el año es incorrecto";//Insertamos el texto dentro de nuestro elemento "expirationValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else if (expirationDate.substr(2, 1) != "/") { //Si el divisor del mes y el año NO es / se ejecutará el siguiente código
    document.getElementById("expirationValid").innerHTML = 
    "El mes y el año debes estar separados por <b>/</b>";//Insertamos el texto dentro de nuestro elemento "expirationValid"
    return false;//Devolvemos false ya que no es lo que esperamos
  } else {//Si no es ninguna de las anteriores condiciones, se ejecutará el código
    document.getElementById("expirationValid").innerHTML = "";//Al ser correcta la validación, quitamos cualquier texto que haya dentro de nuestro elemento "expirationValid"
    return true;//Devolvemos "true", pues es lo que esperamos
  }
}