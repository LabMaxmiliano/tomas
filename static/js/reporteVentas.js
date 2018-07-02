

/*INICIAR SI O SI ESTA VARIABLE EN 0 PARA MOSTRAR LOS 
PRIMEROS REGISTROS*/
inicio = 0;
var tablaTotal;


/*Filas seleccionables*/
$(document).ready(function(){
	$('.tablaSeleccionable').on('mouseover', '.clickable-row', function(event) {
	  $(this).addClass('active').siblings().removeClass('active');
	  
	})});

	

$(document).ready(function(){
	$.ajax({
    type: "POST",
	url: "selectVentas.php",
	contentType: "application/json; charset=utf-8",
	data: null,
	dataType: "json",
	success: function (result) {
		/*ESTA FUNCION CREA PAGINAS DEPENDIENDO DE LA CANTIDAD DE REGISTROS*/
		$(".eliminable").remove();
		$count=0;
		tablaTotal = result;
		$resultados=tablaTotal.length;
		$paginas = Math.floor($resultados/12);
		for(i=0; i<$paginas+1; i++){
			var e = '<li class="eliminable"><a href="#" onclick="envioAjaxPagina('+(i)+')">'+(i+1)+'</a></li>';
			$("#paginas").append(e);
		}
		/*ESTA FUNCION LLENA LAS TABLAS CON REGISTROS HASTA 10*/
		$.each(tablaTotal, function () 
		{
			
//			$('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
//			$('#TablaEmpleado').append(
			var d = '<tr class="clickable-row borrable">'+
			'<td align="center"><button class="btn btn-sm btn-primary btn-click glyphicon glyphicon-pencil margenDerecha" onclick="modificarProveedores()" data-toggle="modal" data-target="#modalEditarProveedor" id="btnEditarUsuario" value="editarProveedor"></button><button class="btn btn-sm btn-danger btn-click glyphicon glyphicon-trash" id="btnEliminarUsuario" value="eliminarProveedor" onclick="borrarProveedor()" data-toggle="modal" data-target="#modalBorrarProveedor"></button></td>'+
			'<td>'+this.ID_PROV+'</td>'+
			'<td>'+this.NOMBRE+'</td>'+
			'<td>'+this.TELEFONO+'</td>'+
			'<td>'+this.EMAIL+'</td>'+
			'</tr>';
			$("#tablaProveedores").append(d);
			/*CON ESTO SOLO AGREGAMOS 10 REGISTROS, MAS ALLA DE QUE EL SELECT LOS TRAJO TODOS
			PORQUE ERAN NECESARIOS PARA CALCULAR LAS PAGINAS*/
			$count = $count+1;
			if ($count>11) {
				return false;
			}
		});   

     },
    error: function (xhr, status, error) {
    //alert(xhr.responseJSON.Message);
	console.log("error");
	console.log(error);
    }
    });
});

	
/*Calcular el precio total basado en los precios presentes en la tabla HTML*/
$(document).ready(function(){
	calcularPrecio()});


	


/*ESTA FUNCION ES SOLO LOCAL, PARA BORRAR DE LA TABLA DE HTML Y DESPUES PROCESAR LOS DATOS,
 NO MODIFICA LA BDD*/
function eliminarSeleccion()
{
	$(".active").remove()
}

/*Calculo de precio funcion*/
function calcularPrecio()
{
	var precioTotal = 0;
	$(".precioTotal").each(function() {
        precioTotal += parseFloat($(this).text());
    });
    $("#botonPrecio").text("Precio total: " + precioTotal);
}

/*Activar o deshabilitar un campo basado en una condicion*/
function toggleActive()
{
	if ($("#chkComision").prop("checked") == true)
	{
		$("#inputComision").prop("disabled", false);
	}
	else
	{
		$("#inputComision").prop("disabled", true);
	}
}

function validarUser()
{
	var validUser = /^[a-z\d_]{4,15}$/i;
	var user = $("#userAAgr").val();
	var validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
	var pass = $("#passAAgr").val();
	if (validUser.test(user)&& validPass.test(pass))
	{
		return true;
	}
	else
	{

		return false;
	}
	
}
function validarProveedor()
{
	var validUser = /^[a-z\d_]{4,15}$/i;
	var validEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; 
	var validtel = /(?<=\s|:)\(?(?:(0?[1-3]\d{1,2})\)?(?:\s|-)?)?((?:\d[\d-]{5}|15[\s\d-]{7})\d+)/
	var proveedor = $("#proveedor").val();
	var telefono = $("#telefonoP").val();
	var email = $("#e-mailP").val();
	if (validUser.test(proveedor) && validEmail.test(telefono) && validtel(telefono))
	{
		return true;
	}
	else
	{
		return false;
	}
}
function validarVendedores()
{
	console.log("true")
	var validnombre = /^[a-z\d_]{4,15}$/i;
	var nombre = $("#NombreVend").val();
	var apellido = $("#ApellidoVend").val();
	var dni = $("#dniVend").val().length;
	var dni1 = isNan(dni)
	var comision = $("#comisionF").val();
	if (validUser.test(nombre) && validEmail.test(apellido) && dni ==8 && dni1 == false && comision>=0 && comision<=100)
	{
		return true
	}
	else
	{
		return false		
	}
}

function validarArticulos()
{
	var validUser = /^[a-z\d_]{4,15}$/i;
	var nombre = $("#NombreArt").val(); 
	var categoria = $("#categoria").val();
	var marca = $("#marca").val();
	var proveedor = $("#proveedorArt").val();
	if (validUser.test(nombre) && validUser.test(categoria) && validUser.test(marca) && validUser.test(nombre))
	{
		return true;
	}
	else
	{
		return false;
	}
}


function borrarProveedor()
{
	var idProveedor=$(".active td:nth-child(2)").text();
	$("#ID_PROVEEDOR").val(idProveedor)
}


function modificarProveedores()
{
	var idProveedor=$(".active td:nth-child(2)").text();
	var nombreProveedor=$(".active td:nth-child(3)").text();
	var telefonoProveedor=$(".active td:nth-child(4)").text();
	var emailProveedor=$(".active td:nth-child(5)").text();
	$("#idProv").val(idProveedor);
	$("#nombreProveedor").val(nombreProveedor);
	$("#telefonoProveedor").val(telefonoProveedor);
	$("#emailProveedor").val(emailProveedor)
	
}

/*Activador de filtros*/
$(document).ready(function(){
    $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    })});

$(document).ready(function(){
    $(".filterable .filters input").keyup(function(e){
		$.ajax({
	    type: "GET",
		url: "selectProveedoresFiltro.php",
		contentType: "application/json; charset=utf-8",
		data: {nombre : $("#nombre").val(), id : $("#id").val(), telefono : $("#telefono").val(), email : $("#email").val()},
		dataType: "json",
		success: function (result) {
			$(".borrable").remove();
			$(".eliminable").remove();
			tablaTotal = result;
			$count=0;
			$resultados=tablaTotal.length;
			$paginas = Math.floor($resultados/12);
			for(i=0; i<$paginas+1; i++){
				var e = '<li class="eliminable"><a href="#" onclick="envioAjaxPagina('+(i)+')">'+(i+1)+'</a></li>';
				$("#paginas").append(e);
			}
			/*ESTA FUNCION LLENA LAS TABLAS CON REGISTROS HASTA 10*/
			$.each(tablaTotal, function () 
			{
				
	//			$('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
	//			$('#TablaEmpleado').append(
				var d = '<tr class="clickable-row borrable">'+
				'<td align="center"><button class="btn btn-sm btn-primary btn-click glyphicon glyphicon-pencil margenDerecha" onclick="modificarProveedores()" data-toggle="modal" data-target="#modalEditarProveedor" id="btnEditarUsuario" value="editarProveedor"></button><button class="btn btn-sm btn-danger btn-click glyphicon glyphicon-trash" id="btnEliminarUsuario" value="eliminarProveedor" onclick="borrarProveedor()" data-toggle="modal" data-target="#modalBorrarProveedor"></button></td>'+
				'<td>'+this.ID_PROV+'</td>'+
				'<td>'+this.NOMBRE+'</td>'+
				'<td>'+this.TELEFONO+'</td>'+
				'<td>'+this.EMAIL+'</td>'+
				'</tr>';
				$("#tablaProveedores").append(d);
				/*CON ESTO SOLO AGREGAMOS 10 REGISTROS, MAS ALLA DE QUE EL SELECT LOS TRAJO TODOS
				PORQUE ERAN NECESARIOS PARA CALCULAR LAS PAGINAS*/
				$count = $count+1;
				if ($count>11) {
					return false;
				}
			});  

	     },
	    error: function (xhr, status, error) {
	    //alert(xhr.responseJSON.Message);
		console.log("error");
		console.log(error);
	    }
	    });
	  });
});


/*HACE QUE EL ENTER CLICKEE EL BUSCADOR*/
$(document).keypress(function(e){
    if (e.which == 13){
        $("#buscador").click();
    }
});

function envioAjaxPagina(pagina){
	inicio = pagina*12;
	console.log(inicio);
	console.log(inicio+12);
	$(".borrable").remove();
	$.each(tablaTotal.slice(inicio,inicio + 12), function () 
		{
//			$('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
//			$('#TablaEmpleado').append(
			var d = '<tr class="clickable-row borrable">'+
			'<td align="center"><button class="btn btn-sm btn-primary btn-click glyphicon glyphicon-pencil margenDerecha" onclick="modificarProveedores()" data-toggle="modal" data-target="#modalEditarProveedor" id="btnEditarUsuario" value="editarProveedor"></button><button class="btn btn-sm btn-danger btn-click glyphicon glyphicon-trash" id="btnEliminarUsuario" value="eliminarProveedor" onclick="borrarProveedor()" data-toggle="modal" data-target="#modalBorrarProveedor"></button></td>'+
			'<td>'+this.ID_PROV+'</td>'+
			'<td>'+this.NOMBRE+'</td>'+
			'<td>'+this.TELEFONO+'</td>'+
			'<td>'+this.EMAIL+'</td>'+
			'</tr>';
			$("#tablaProveedores").append(d);
		});   

     }
