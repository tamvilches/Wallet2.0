// Función para formatear una fecha en formato legible
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Función para cargar y mostrar el historial de transferencias
function cargarHistorialTransferencias() {
    // Obtener el historial de transferencias guardado en localStorage
    const transferenciasGuardadas = JSON.parse(localStorage.getItem('transferencias')) || [];
    
    // Seleccionar el elemento <ul> donde se mostrará el historial de transferencias
    const listaTransferencias = document.querySelector('.list-group');

    // Limpiar la lista de transferencias
    listaTransferencias.innerHTML = '';

    // Iterar sobre las transferencias y crear elementos <li> para cada una
    transferenciasGuardadas.forEach(function(transferencia) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${transferencia.contacto} - $${transferencia.monto} - ${formatearFecha(transferencia.fecha)}`;
        listaTransferencias.appendChild(li);
    });
}

// Función para cargar y mostrar el historial de depósitos
function cargarHistorialDepositos() {
    // Obtener el historial de depósitos guardado en localStorage
    const depositosGuardados = JSON.parse(localStorage.getItem('depositos')) || [];
    
    // Seleccionar el elemento <ul> donde se mostrará el historial de depósitos
    const listaDepositos = document.querySelector('.list-group');

    // Iterar sobre los depósitos y crear elementos <li> para cada uno
    depositosGuardados.forEach(function(deposito) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `Depósito realizado - $${deposito.monto} - ${formatearFecha(deposito.fecha)}`;
        listaDepositos.appendChild(li);
    });
}

// Llamar a las funciones para cargar y mostrar el historial de transferencias y depósitos cuando la página se cargue
document.addEventListener('DOMContentLoaded', function() {
    cargarHistorialTransferencias();
    cargarHistorialDepositos();
});

////////////////////////////////////////////////////



// Función para cargar y mostrar el historial de movimientos
function cargarHistorialMovimientos() {
    // Obtener el historial de transferencias y depósitos guardado en localStorage
    const transferenciasGuardadas = JSON.parse(localStorage.getItem('transferencias')) || [];
    const depositosGuardados = JSON.parse(localStorage.getItem('depositos')) || [];
    
    // Seleccionar el elemento <ul> donde se mostrará el historial de movimientos
    const listaMovimientos = $('#historialMovimientos');

    // Limpiar la lista de movimientos
    listaMovimientos.empty();

    // Filtrar los movimientos según el tipo seleccionado
    const tipoSeleccionado = $('#filtroMovimientos').val();
    let movimientosFiltrados = [];

    if (tipoSeleccionado === 'todos') {
        movimientosFiltrados = [...transferenciasGuardadas, ...depositosGuardados]; // Mostrar todos los movimientos
    } else if (tipoSeleccionado === 'tranfRealizada') {
        // Filtrar por transferencias realizadas
        movimientosFiltrados = transferenciasGuardadas.filter(movimiento => movimiento.tipo === 'transferenciaRealizada');
    } else if (tipoSeleccionado === 'deposito') {
        // Mostrar solo los depósitos
        movimientosFiltrados = depositosGuardados.filter(movimiento => movimiento.tipo === tipoSeleccionado);
    } else if (tipoSeleccionado === 'transfRecibida') {
        // Filtrar por transferencias recibidas
        movimientosFiltrados = transferenciasGuardadas.filter(movimiento => movimiento.tipo === tipoSeleccionado);
    }

    // Iterar sobre los movimientos filtrados y crear elementos <li> para cada uno
    movimientosFiltrados.forEach(function(movimiento) {
        const li = $('<li>').addClass('list-group-item');
        const textoMovimiento = `${movimiento.tipo === 'deposito' ? 'Depósito' : 'Transferencia'} - $${movimiento.monto} - ${formatearFecha(movimiento.fecha)}`;
        li.text(textoMovimiento);

        // Agregar clase de color dependiendo del tipo de movimiento
        if (movimiento.tipo === 'deposito') {
            li.css('color', 'green');
        } else if (movimiento.tipo === 'transferenciaRealizada') {
            li.css('color', 'red');
        }

        listaMovimientos.append(li);
    });
}


// Llamar a la función para cargar y mostrar el historial de movimientos cuando la página se cargue
$(document).ready(function() {
    cargarHistorialMovimientos();
});

// Agregar evento de cambio al select para filtrar los movimientos
$('#filtroMovimientos').on('change', function() {
    cargarHistorialMovimientos(); // Llamar a la función para cargar los movimientos filtrados
});



