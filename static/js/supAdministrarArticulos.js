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
	url: "selectArticulos.php",
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
			'<td align="center"><button class="btn btn-sm btn-primary btn-click glyphicon glyphicon-pencil margenDerecha" onclick="modificarArticulos()" data-toggle="modal" data-target="#modalEditarArticulo" id="btnEditarArticulo" value="editarProveedor"></button><button class="btn btn-sm btn-danger btn-click glyphicon glyphicon-trash" id="btnEliminarArticulo" value="eliminarArticulo" onclick="borrarArticulo()" data-toggle="modal" data-target="#modalBorrarArticulo"></button></td>'+
				'<td>'+this.ID_ART+'</td>'+
				'<td>'+this.NOMBRE_ART+'</td>'+
				'<td>'+this.NOMBRE_CAT+'</td>'+
				'<td>'+this.MARCA+'</td>'+
				'<td>'+this.NOMBRE+'</td>'+
				'<td>'+this.STOCK+'</td>'+
			'</tr>';
			$("#tablaArticulos").append(d);
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

$(document).ready(function(){
    $.ajax({
    type: "POST",
    url: "selectProveedores.php",
    contentType: "application/json; charset=utf-8",
    data: null,
    dataType: "json",
    success: function (result) {
        tablaTotal = result;
        $.each(tablaTotal, function () 
        {
//            $('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
//            $('#TablaEmpleado').append(
            var d = '<option value='+this.ID_PROV+'>'+this.NOMBRE+'</td>';
            $("#comboAltaProveedor").append(d);
            $("#comboModificacionProveedor").append(d);
            //CON ESTO SOLO AGREGAMOS 10 REGISTROS, MAS ALLA DE QUE EL SELECT LOS TRAJO TODOS
            //PORQUE ERAN NECESARIOS PARA CALCULAR LAS PAGINAS/
        });

     },
    error: function (xhr, status, error) {
    //alert(xhr.responseJSON.Message);
    console.log("error");
    console.log(error);
    }
    });
});

$(document).ready(function(){
    $.ajax({
    type: "POST",
    url: "selectCategorias.php",
    contentType: "application/json; charset=utf-8",
    data: null,
    dataType: "json",
    success: function (result) {
    	console.log(result);

        tablaTotal = result;
        $.each(tablaTotal, function () 
        {
//            $('#selEmpleado').append($("<option></option>").attr("value",    this.idempleado).text(this.apellido));
//            $('#TablaEmpleado').append(
            var d = '<option value='+this.ID_CATEGORIA+'>'+this.NOMBRE_CAT+'</td>';
            $("#comboModificarCategoria").append(d);
            $("#comboAltaCategoria").append(d);
            //CON ESTO SOLO AGREGAMOS 10 REGISTROS, MAS ALLA DE QUE EL SELECT LOS TRAJO TODOS
            //PORQUE ERAN NECESARIOS PARA CALCULAR LAS PAGINAS/
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





function borrarArticulo()
{
	var idArticulo=$(".active td:nth-child(2)").text();
	$("#ID_ART").val(idArticulo)
}

function modificarArticulos()
{
	var idArticulo=$(".active td:nth-child(2)").text();
	var nombreArticulo=$(".active td:nth-child(3)").text();
	var categoriaArticulo=$(".active td:nth-child(4)").text();
	var marcaArticulo=$(".active td:nth-child(5)").text();
	var proveedorArticulo=$(".active td:nth-child(6)").text();
	var stockArticulo=$(".active td:nth-child(7)").text();
	$("#idArticulo").val(idArticulo);
	$("#nombreArticulo").val(nombreArticulo);
	$("#categoriaArticulo").val(categoriaArticulo);
	$("#marcaArticulo").val(marcaArticulo);
	$("#proveedorArticulo").val(proveedorArticulo);
	$("#stockArticulo").val(stockArticulo);
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
		url: "selectArticulosFiltro.php",
		contentType: "application/json; charset=utf-8",
		data: {nombre : $("#nombre").val(), codigo : $("#codigo").val(), categoria : $("#categoria").val(), marca : $("#marca").val(), proveedor : $("#proveedor").val(), stock : $("#stock").val()},
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
				'<td align="center"><button class="btn btn-sm btn-primary btn-click glyphicon glyphicon-pencil margenDerecha" onclick="modificarArticulos()" data-toggle="modal" data-target="#modalEditarArticulo" id="btnEditarArticulo" value="editarProveedor"></button><button class="btn btn-sm btn-danger btn-click glyphicon glyphicon-trash" id="btnEliminarArticulo" value="eliminarArticulo" onclick="borrarArticulo()" data-toggle="modal" data-target="#modalBorrarArticulo"></button></td>'+
				'<td>'+this.ID_ART+'</td>'+
				'<td>'+this.NOMBRE_ART+'</td>'+
				'<td>'+this.ID_CATEGORIA+'</td>'+
				'<td>'+this.MARCA+'</td>'+
				'<td>'+this.NOMBRE+'</td>'+
				'<td>'+this.STOCK+'</td>'+
				'</tr>';
				$("#tablaArticulos").append(d);
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
			'<td align="center"><button class="btn btn-sm btn-primary btn-click glyphicon glyphicon-pencil margenDerecha" onclick="modificarArticulos()" data-toggle="modal" data-target="#modalEditarArticulo" id="btnEditarArticulo" value="editarProveedor"></button><button class="btn btn-sm btn-danger btn-click glyphicon glyphicon-trash" id="btnEliminarArticulo" value="eliminarArticulo" data-toggle="modal" data-target="#modalBorrarArticulo"></button></td>'+
				'<td>'+this.ID_ART+'</td>'+
				'<td>'+this.NOMBRE_ART+'</td>'+
				'<td>'+this.ID_CATEGORIA+'</td>'+
				'<td>'+this.MARCA+'</td>'+
				'<td>'+this.NOMBRE+'</td>'+
				'<td>'+this.STOCK+'</td>'+
			'</tr>';
			$("#tablaArticulos").append(d);
		});   

     }


////////////////////////////////////////// FUNCION VALIDAR ARTICULOS ALTA //////////////////////////////////////////

function validarArticulos()
{
	var usuario = $("#nombreArt");
	var stockInicial = $("#stockInicial");

	var reg = /^[A-Za-z0-9 ]{4,25}$/;
	var match = usuario.val().match(reg);
	if (!match) 
	{
		event.preventDefault();
		$("#errorAltaNombre").siblings().addClass('hidden');
		$("#errorAltaNombre").removeClass('hidden');
		return false;
	}
	
	if (stockInicial.val()<1) {
		$("#errorAltaStock").siblings().addClass('hidden');
		$("#errorAltaStock").removeClass('hidden');
		event.preventDefault();	
		return false;	
	}

	if (isNaN(stockInicial.val())) {
		$("#errorAltaStock").siblings().addClass('hidden');
		$("#errorAltaStock").removeClass('hidden');
		event.preventDefault();	
		return false;
	}
	$( "#erroresAlta" ).find( "*" ).addClass('hidden');
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// FUNCION VALIDAR ARTICULOS MODIFICACION //////////////////////////////////////////

function validarArticulosModificacion()
{
	var usuario = $("#nombreArticulo");
	var reg = /^[A-Za-z0-9 ]{4,25}$/;

	var match = usuario.val().match(reg);
	if (!match) 
	{
		event.preventDefault();
		$("#errorModificacionNombre").siblings().addClass('hidden');
		$("#errorModificacionNombre").removeClass('hidden');
		return false;
	}
	
	var stockInicial = $("#stockArticulo");
	if (stockInicial.val()<1) {
		$("#errorModificacionStock").siblings().addClass('hidden');
		$("#errorModificacionStock").removeClass('hidden');
		event.preventDefault();	
		return false;	
	}

	if (isNaN(stockInicial.val())) {
		$("#errorModificacionStock").siblings().addClass('hidden');
		$("#errorModificacionStock").removeClass('hidden');
		event.preventDefault();	
		return false;
	}
	$( "#erroresModificacion" ).find( "*" ).addClass('hidden');
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
