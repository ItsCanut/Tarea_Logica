
// --------------------------------------------------------
//
//
// --------------------------------------------------------

// --------------------------------------------------------
// --------------------------------------------------------
const Logica = require( "../Logica.js" )

var assert = require ('assert')

// --------------------------------------------------------
// main ()
// --------------------------------------------------------

//
//
//
describe( "Test 1 (probar a añadir zonas)", function() {

	// ....................................................
	//
	// ....................................................
	var laLogica = null
	before(  function( hecho ) {
		laLogica = new Logica(
			"../datos/Zonas.bd",
			function( err ) {
				assert.equal( null, err, " conexión a BD fallada: " + err)
				hecho()
			})
	}) // before

	// ....................................................
	//
	// ....................................................
	it( "borro datos ", function( hecho ){

		laLogica.borrarTodosLosDatos( function() {
			hecho()
		})

	}) // it

	// ....................................................
	//
	// ....................................................
	it( "inserto zona marjal", function( hecho ){

		var datos = {
			nombre: "marjal",
			descripcion: "marjal al lado del Grau de Gandia"
		}

		laLogica.nuevaZona( datos, function(err) {
			assert.ok( ! err, " ¿hay error? : " + err )
			hecho()
		})

	}) // it

	// ....................................................
	//
	// ....................................................
	it( "inserto un vertice para marjal", function( hecho ){

		var vertice = {
			longitud: 0, // X
			latitud: 1 // Y
		}

		laLogica.nuevoVerticeParaZona( "marjal", vertice, function( err ) {
			assert.ok( ! err, "" + err )

			hecho()
		})

	}) // it

	// ....................................................
	//
	// ....................................................
	it( "pruebo getZonas()", function( hecho ){2


		laLogica.getZona("marjal",function(err){
			assert.ok(!err,""+err)
			
		})


		hecho()

	}) // it

	// ....................................................
	//
	// ....................................................

	it("pruebo getDescripcionDeZona()", function(hecho){

		laLogica.getDescripcionDeZona("marjal",
			function(err,res){

				assert.ok(! err )
				assert.ok( res.includes("Grau"))

				hecho()  //hecho va donde el test ha terminado
			})

	}) // it


	// ....................................................
	//
	// ....................................................


	it("pruebo que NO encuentro la descripcion de una zona que NO existe",
		function( hecho ){

			laLogica.getDescripcionDeZona("marjal",
				function(err,res){
					assert.ok(!err)
					assert.ok(!err)

					//hecho va donde el test ha terminado
					hecho()
				})
		})


	after( function() {
		laLogica.cerrar()
	})

}) // describe
