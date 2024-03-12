////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// Login//

//Función que verifica las credenciales de acceso y muestra un mensaje de error de ingreso o ingreso exitoso según corresponda

//Función que verifica las credenciales de acceso y muestra un mensaje de error de ingreso o ingreso exitoso según corresponda
function verificarCredenciales() {
    var email = $('#email').val();
    var password = $('#password').val();

    // Validación email y contraseña
    if (email === "aast@gmail.com" && password === "123") {
        // salta el mensaje de exito con sweetAlert
        Swal.fire({
            icon: 'success',
            title: '¡Inicio de Sesión Exitoso!',
            text: 'Bienvenido, ' + email + '!',
            confirmButtonText: 'OK'
        }).then(function(){
            window.location.href = "menu.html"; //Uso de JQuery para redigir la pantalla
        });
    } else {
        // salta error con SweetAlert
        Swal.fire({
            icon: 'error',
            title: '¡Error de Inicio de Sesión!',
            text: 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.',
            confirmButtonText: 'OK'
        });
    }
}
