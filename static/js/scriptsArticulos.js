/*Filas seleccionables*/
$(document).ready(function(){
	$('.tablaSeleccionable').on('click', '.clickable-row', function(event) {
	  $(this).addClass('active').siblings().removeClass('active');
	  
	})});

	
	
$(document).ready(function(){
	$.ajax({
    type: "POST",
	url: "selectArticulos.php",
	contentType: "application/json; charset=utf-8",
	data: null,
	dataType: "json",
	success: function (result) {
		$.each(result, function () 
		{
			
//			$('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
//			$('#TablaEmpleado').append(
			
			var d = '<tr class="clickable-row">'+
			'<td>'+this.ID_ART+'</td>'+
			'<td>'+this.NOMBRE_ART+'</td>'+
			'<td>'+this.ID_CATEGORIA+'</td>'+
			'<td>'+this.MARCA+'</td>'+
			'<td>'+this.STOCK+'</td>'+
			'</tr>';
				
			$("#tablaArticulos").append(d);
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

function modificarProveedores()
{
	var idProveedor=$(".active td:nth-child(1)").text();
	var nombreProveedor=$(".active td:nth-child(2)").text();
	var telefonoProveedor=$(".active td:nth-child(3)").text();
	var emailProveedor=$(".active td:nth-child(4)").text();
	$("#idProv").val(idProveedor);
	$("#nombreProveedor").val(nombreProveedor);
	$("#telefonoProveedor").val(telefonoProveedor);
	$("#emailProveedor").val(emailProveedor)
	
	

}
function administrarArticulos()
{
	$.ajax({
    type: "POST",
	url: "selectArticulos.php",
	contentType: "application/json; charset=utf-8",
	data: null,
	dataType: "json",
	
	success: function (result) {
		$.each(result, function () 
		{
			
//			$('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
//			$('#TablaEmpleado').append(
			
			var d ='<option>'+this.MARCA+'</option>';
			console.log(d)
			var c ='<option>'+this.ID_CATEGORIA+'</option>';
			
				
			$("#marca").append(d);
			$("#categoria").append(c)
		});   

     },
    error: function (xhr, status, error) {
    //alert(xhr.responseJSON.Message);
	console.log("error");
	console.log(error);
    }
    });
};

