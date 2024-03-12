// En depositar.js
// Definir el objeto de tipos de movimientos
const tiposMovimientos = {
    DEPOSITO: "deposito"
};

$(document).ready(function() {
    // Obtener el saldo del localStorage al cargar la página con jQuery
    let saldo = parseFloat(localStorage.getItem('saldo')) || 0;
    const saldoElement = $("#saldo");
    saldoElement.text("Saldo Actual: $" + saldo.toFixed(2));

    const btnDeposit = $("#btnMontoDeposit"); // Obtener el botón de depósito

    // Agregar un evento click al botón de depósito con jQuery
    btnDeposit.on("click", function(event) {
        event.preventDefault();
        const montoDeposit = parseFloat($("#inputDeposit").val()); // Obtener el valor del monto de depósito
        // Validar si el valor ingresado es un número positivo
        if (isNaN(montoDeposit) || montoDeposit <= 0) {
            //error SweetAlert
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ingrese un monto válido."
            });
            return;
        }

        saldo += montoDeposit;    // Incrementar el saldo en la cuenta
        localStorage.setItem('saldo', saldo);// Guardar el saldo en el localStorage
        console.log("Nuevo saldo después del depósito:", saldo);    

        // Guardar el historial de depósitos
        const depositosGuardados = JSON.parse(localStorage.getItem('depositos')) || [];
        const nuevoDeposito = {
            tipo: tiposMovimientos.DEPOSITO, // Usar el tipo de movimiento definido en el objeto
            monto: montoDeposit,
            fecha: new Date().toISOString()
        };
        console.log("Tipo de movimiento:", nuevoDeposito.tipo);
        depositosGuardados.push(nuevoDeposito);
        localStorage.setItem('depositos', JSON.stringify(depositosGuardados));
        console.log("depositos guardados:", depositosGuardados);

        saldoElement.text("Nuevo saldo: $" + saldo.toFixed(2)); // Actualizar saldo en pantalla 
                
        // éxito sweetAlert
        Swal.fire({
            icon: "success",
            title: "Acabas de depositar: $" + montoDeposit + " en tu AlkeWallet",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            setTimeout(function() {
                window.location.href = "menu.html"; 
            }, 2000); 
        });
        
    });

   

    // Agregar evento click al botón "Ir al menú principal"
    $(".btn-secondary").on("click", function(event) {
        event.preventDefault();
        window.location.href = "menu.html";
    });
});
