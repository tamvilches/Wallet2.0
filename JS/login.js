/*const form = document.getElementById('loginForm');
const user = document.getElementById('exampleInputEmail1');
const pass = document.getElementById('exampleInputPassword1');

function login(e){
    e.preventDefault();

    const logged = (user.value === 'admin@admin.cl' && pass.value === '12345')
    if(logged){
        sessionStorage.setItem(auth, true)
        window.location.href= '../HTML/menu.html'
        console.log('coincidió')
    }else{
        alert('Alguno de los datos ingresados no es correcto, porfavor revisa tu información.')
        console.log('no coincidió')
    }
}

form.addEventListener('submit', login);*/




function verificarCredenciales() {
    
    let OK = document.getElementById

    var email = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;

    // Validación email y contraseña
        
        if (email === "aast@gmail.com" && password === "123") {
            // me salta el mensaje de exito con sweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡Inicio de Sesión Exitoso!',
                text: 'Bienvenido, ' + email + '!',
                confirmButtonText: 'OK'
            }).then(function(){
                window.location.href = "/html/menu.html";
    //         C:\Users\Tamara Vilches\BootCamp Java\Wallet2.0\HTML\menu.html  
    // HTML\menu.html
           });
        } else {
            // me salta error con SweetAlert
            Swal.fire({
                icon: 'error',
                title: '¡Error de Inicio de Sesión!',
                text: 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'OK'
            });
        }

    }
