
// --------------------------------------------------------
//
// --------------------------------------------------------

// --------------------------------------------------------
// --------------------------------------------------------
const assert = require ('assert')

const request = require ('request')

// --------------------------------------------------------
// --------------------------------------------------------
const IP_PUERTO="http://localhost:8080"

// --------------------------------------------------------
// main ()
// --------------------------------------------------------

//
//
//
describe( "Test 2 (GET zona)", function() {
	// ....................................................
	//
	// ....................................................
	it( "pruebo que GET /zona/xeresa da 404 (no existe la zona)", function( hecho ){
		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/zona/xeresa"
			},
			// callback para cuando llegue respuesta
			function (err, response, body) {

				assert.equal( err, null, "¿error no vale null? " + err )
				console.log(response.statusCode);
				assert.equal( response.statusCode, 404,
							  "¿status code no es 404?" )

				console.log (" ----- respuesta a GET /zona/xeresa ---- ")
				console.log ("       body = " + body)
				console.log (" -------------------------------- ")
				//
				//
				//
				hecho ()
			}
		) // post
	}) // it

	//----------------------------------------------------------------------------
	it( "pruebo que GET /zona/xeresa/descripcion da 404 (no existe la zona)", function( hecho ){
		request.get ( // peticion: GET
			{
				url: IP_PUERTO+"/zona/xeresa/descripcion"
			},
			// callback para cuando llegue respuesta
			function (err, response, body) {

				assert.equal( err, null, "¿error no vale null? " + err )
				console.log(response.statusCode);
				assert.equal( response.statusCode, 404,
								"¿status code no es 404?" )

				console.log (" ----- respuesta a GET /zona/xeresa ---- ")
				console.log ("       body = " + body)
				console.log (" -------------------------------- ")
				//
				//
				//
				hecho ()
			}
		) // post
	}) // it
}) // describe
