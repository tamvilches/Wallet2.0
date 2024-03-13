////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Menú//

// -> Evento para que al clickear alguno el boton depositar aparezca una leyenda redirigiendo

const botonDeposit = document.getElementById("btnDeposit");
botonDeposit.addEventListener("click", function(event) {
        event.preventDefault();
        //SweetAlert
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });  
        Toast.fire({
            icon: "success",
            title: "Estás siendo redirigido a la página de Depósitos...!"
        });
        // Redirigir post alerta
        setTimeout(function() {
            window.location.href = "deposit.html";
        }, 1000); // tiempo de espera 
        });

// -> Evento para que al clickear Enviar Dineroo aparezca una leyenda redirigiendo
const botonEnviar = document.getElementById("btnEnviarDinero");
botonEnviar.addEventListener("click", function(event) {
        event.preventDefault();
        //SweetAlert
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });  
        Toast.fire({
            icon: "success",
            title: "Podrás transferir a tus contactos ...!"
        });
        // Redirigir post alerta
        setTimeout(function() {
            window.location.href = "sendmoney.html";
        }, 1000); // tiempo de espera 
        });

// -> Evento para que al clickear Enviar Ultimos Movimientos aparezca una leyenda redirigiendo
const botonMovi = document.getElementById("btnMov");
botonMovi.addEventListener("click", function(event) {
        event.preventDefault();
        //SweetAlert
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });  
        Toast.fire({
            icon: "success",
            title: "Serás redirigido a tu historial de movimientos...!"
        });
        // Redirigir post alerta
        setTimeout(function() {
            window.location.href = "transactions.html";
        }, 1000); // tiempo de espera 
        });


// -> Evento para guardar el saldo de los depositos realizados en deposit.html y mostrarlos 
document.addEventListener('DOMContentLoaded', function() {
    const saldoGuardado = localStorage.getItem('saldo'); //saldo recuperado del LS
    if (saldoGuardado !== null) { //tiene saldo el LS?
        const saldoElement = document.getElementById("saldo"); //mostrar saldo en pantalla
        saldoElement.textContent = "$" + parseFloat(saldoGuardado).toFixed(2);
    }
});

