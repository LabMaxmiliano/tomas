function modalVerEmpleado(idEmpleado, nombreEmpleado, apellidoEmpleado, puestoEmpleado)
{
    var nombre = nombreEmpleado;
    var apellido = apellidoEmpleado;
    var id = idEmpleado;
	var puesto = puestoEmpleado;
    document.getElementById("nombreEmpleadoVer").value = nombre;
    document.getElementById("apellidoEmpleadoVer").value = apellido;
    document.getElementById("puestoEmpleadoVer").value = puesto;
    $("#modalVerEmpleado").modal();
}

function modalEditarEmpleado(idEmpleado, nombreEmpleado, apellidoEmpleado, puestoEmpleado, activo)
{
    var nombre = nombreEmpleado;
    var apellido = apellidoEmpleado;
    var id = idEmpleado;
	var puesto = puestoEmpleado;
	var activo = activo;
	console.log(id)
	console.log(nombre)
	console.log(apellido)
	console.log(activo)
    document.getElementById("nombreEmpleadoModificar").value = nombre;
    document.getElementById("apellidoEmpleadoModificar").value = apellido;
    document.getElementById("puestoEmpleadoModificar").value = puesto;
	document.getElementById("idEmpleadoModificar").value = id;
	$("#modalEditarEmpleado").modal();
}

function modalBorrarEmpleado(idEmpleado)
{
	var id = idEmpleado;
	document.getElementByid("").value = id;
	$().modal();
}
