$(document).ready(function()
	{
		$("#botonSubmit").click(function(event)
		{
			var usuario = $("#usuario");
			var password = $("#password");
			var reg = /^[A-Za-z0-9_]{4,15}$/;
	
			var match = usuario.val().match(reg);
			if (!match) 
			{
				console.log("val");
				event.preventDefault();
				$("#errorUsuario").removeClass('hidden');
				$("#errorUsuario").siblings().addClass('hidden');
				return false;
			}
			var reg2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
			var match = password.val().match(reg2);
			if(!match)
				{
				console.log("val2");
				event.preventDefault();
				$("#errorContrasenia").removeClass('hidden');
				$("#errorContrasenia").siblings().addClass('hidden');
				return false;	
				}	
			});

	});
