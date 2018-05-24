
// ---------------------------------------------------------------------
// logica.js
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
const ConexionBD = require( "./ConexionBD.js" )

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
class Logica {

	// .................................................................
	//
	// nombreBD: Texto
	// -->
	//    f ()
	// -->
	// Terminado // via callback()
	//
	// .................................................................
	constructor( nombreBD, callback ) {
		this.laConexion = new ConexionBD( nombreBD, callback )
	}

	// .................................................................
	// .................................................................
	cerrar() {
		this.laConexion.cerrar()
	}

	// .................................................................
	//
	// datosZona: JSON {nombre: Texto, descripcion: Texto}
	// -->
	//    f ()
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevaZona( datosZona, callback ) {

		var textoSQL = 'insert into Zona values ( $nombre, $descripcion );'
		var datos = {
			$nombre: datosZona.nombre,
			$descripcion: datosZona.descripcion
		}

		this.laConexion.modificarConPrepared( textoSQL, datos, callback )

	} // ()

	// .................................................................
	//
	//    f()
	// -->
	// Terminado // via callbak()
	//
	// .................................................................
	borrarTodosLosDatos( callback ) {
		var self = this

		//
		// borrar primero los que dependen de otros (foreign key)
		//
		this.laConexion.modificar( "delete from Vertice;", function () {
			self.laConexion.modificar( "delete from Zona;", function () {
				callback();
				return;
			})
		})
	} // ()

	// .................................................................
	//
	// nombreZona: texto
	// vertice: JSON {latitud: R, longitud: R}
	// -->
	//    f ()
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevoVerticeParaZona( nombreZona, vertice, callback ) {

		var textoSQL = 'insert into Vertice values ( $nombre, $longitud, $latitud );'
		var datos = {
			$nombre: nombreZona,
			$longitud: vertice.longitud,
			$latitud: vertice.latitud
		}

		this.laConexion.modificarConPrepared( textoSQL, datos, callback )

	} // ()

	// .................................................................
	// .................................................................

	getZona( nombreZona, callback ) {
	    var a;
	    var that = this;
	    this.getDescripcionDeZona(nombreZona, function (err,res1){
		    that.getVertice(nombreZona, function(err, res2){

					console.log(res2);
			    var zona = {
							nombre: nombreZona,
							descripcion: res1,
							vertices : {
									longitud: res2[0].longitud,
									latitud: res2[0].latitud
									}
							}

					callback(null, zona);
					return;

					});
		    });
	} // ()


		// .................................................................
		// .................................................................


	getVertice( nombreZona, callback ) {
	    var preguntaB = "SELECT * from Vertice where nombreZona = '" + nombreZona + "';"

		//console.log(pregunta);

	    this.laConexion.consultar(preguntaB, function (err, res){

		    // mirar si hay error
		    //si hay error, devolver error y no seguir

		    if (err) {

		    callback(err, null) //devuelve error, resultado nulo
		    return; //no sigue

		    }

		    if(res.length==0){

		    callback(null,null)
		    return;

		    }

		    //NO HAY ERROR

		    callback(null,res) //devuelve resultado
				return;

		    })
	}//()

	// .................................................................
	// .................................................................

	getDescripcionDeZona(nombreZona, callback){
		//console.log( " getDescripcionDeZona(): me han llamado ")

			// hay que consultar la base de datos


			var pregunta = "select * from Zona where nombre='"
				+ nombreZona + "';"

				//console.log( pregunta )

				this.laConexion.consultar( pregunta, function(err,res){

					//mirar si hay error
					//si hay error devolver el error
					//y no seguir
					if( err ) {
						callback( err, null ) //devuelve
						return // no sigo
					}

					// error no hay

					// miro si el array esta vacío
					if( res.length == 0 || res==undefined) {
							// vaya, no hay ninguna zona con ese nombre ;(((
							callback(null, null)
							return // no sigo
					}

					//error no hay, SI hay resultado


					callback( null, res[0].descripcion ) // devuelve resultado
					return;
					})

	}//()

} // class

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
module.exports = Logica

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
