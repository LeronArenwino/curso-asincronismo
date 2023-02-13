const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

//Funcion que obtendrá la informacion del producto como un objeto
function fetchData(urlApi, callback) {
  // Inicializar un objeto de tipo XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // El metodo .open realiza la petición de apertura de comunicación, el metodo puede ser 'GET' o 'POST', luego se envia la URL, si es asincrono (true o false), usuario y contraseña. En esta caso solo se utiliza el metodo, la url y async
  xhttp.open("GET", urlApi, true);
  // Este metodo almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado
  xhttp.onreadystatechange = function (event) {
    //El atributo readyState define el estado del objeto XMLHttpRequest
    //0 No inicializado
    //1 Loading
    //2 ejecutado
    //3 interactuando
    //4 completado
    if (xhttp.readyState === 4) {
      // Si la respuesta de la API es exitosa (200 Ok)
      if (xhttp.status === 200) {
        // Se ejecuta el callback recibiendo como argumentos un objeto, como la respuesta de la API es un texto plano, el metodo JSON.parse tranformará este texto en un objeto.
        // El atributo devuelve un DOMString que contiene la  respuesta a la consulta como un texto o null si la consulta no tuvo exito o aun no ha sido completada.
        callback(null, JSON.parse(xhttp.responseText));
      }
      // Si la respuesta de la API no es exitosa se captura el error
    } else {
      // Se inicializa un objeto de tipo Error donde se le envian como argumentos un mensaje de error y la URL de la API para conocer en dónde se produjo el error
      const error = new Error("Error " + urlApi);
      // Se ejecuta el callback recibiendo como argumentos el error y null debido a que no se pudo obtener el objeto
      return callback(error, null);
    }
  };
  // El método .send() envia la petición al servidor
  xhttp.send();
}


fetchData(`${API}/products`, function (error1, data1) {
  if (error1) return console.error(error1);
  fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
    if (error2) return console.error(error2);
    fetchData(
      `${API}/categories/${data2?.category?.id}`,
      function (error3, data3) {
        if (error3) return console.error(error3);
        console.log(data1[0]);
        console.log(data2.title);
        console.log(data3.name);
      },
    );
  });
});
