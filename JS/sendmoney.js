$(document).ready(function() {

    $('#btnTransferir').hide(); // Ocultar el botón "Transferir" al cargar la página
    // Función para cargar los contactos desde localStorage y mostrarlos en el acordeón
    function cargarContactos() {
        // Obtener los contactos guardados en localStorage
        const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
        
        // Seleccionar el elemento del acordeón donde se mostrarán los contactos
        const listaContactos = $('#listaContactos');

        // Limpiar el acordeón de contactos
        listaContactos.empty();

        // Ordenar los contactos alfabéticamente por nombre
        contactosGuardados.sort((a, b) => (a.nombreApellido > b.nombreApellido) ? 1 : -1);

        // Iterar sobre los contactos y crear elementos de acordeón para cada uno
        contactosGuardados.forEach(function(contacto, index) {
            const collapseId = `collapse-${index}`;
            const accordionItem = $('<div>').addClass('accordion-item');
            const accordionHeader = $('<h2>').addClass('accordion-header');
            const nombreMayuscula = contacto.nombreApellido.replace(/\b\w/g, function(l){ return l.toUpperCase() });
            const accordionButton = $('<button>').addClass('accordion-button').attr({
                type: 'button',
                'data-bs-toggle': 'collapse',
                'data-bs-target': `#${collapseId}`,
                'aria-expanded': 'false',
                'aria-controls': collapseId
            }).text(nombreMayuscula);
            const accordionCollapse = $('<div>').addClass('accordion-collapse collapse').attr({
                id: collapseId,
                'data-bs-parent': '#listaContactos'
            });
            const accordionBody = $('<div>').addClass('accordion-body').html(
                `Número de CBU: ${contacto.numeroCBU}<br>
                Alias: ${contacto.alias}<br>
                Banco: ${contacto.nombreBanco}`
            );

            accordionHeader.append(accordionButton);
            accordionCollapse.append(accordionBody);
            accordionItem.append(accordionHeader, accordionCollapse);
            listaContactos.append(accordionItem);
        });
    }

    // Función para cargar y mostrar el saldo actual
    function mostrarSaldo() {
        // Obtener el saldo del localStorage
        const saldo = localStorage.getItem('saldo');
        
        // Mostrar el saldo en el elemento correspondiente
        $('#saldoAmount').text(saldo || '0.00');
    }
    cargarContactos();// Llamar a la función para cargar contactos cuando la página se carga
    mostrarSaldo();// Llamar a la función para mostrar el saldo cuando la página se carga


    // Función para filtrar los contactos según el texto ingresado en el campo de búsqueda
    function filtrarContactos() {
        const textoBusqueda = $('#inputBuscar').val().toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas
        const contactos = $('#listaContactos').find('.accordion-button'); // Obtener todos los botones de contacto

        // Iterar sobre los botones de contacto y mostrar/ocultar según el texto de búsqueda
        contactos.each(function() {
            const contacto = $(this).text().toLowerCase(); // Obtener el nombre del contacto y convertirlo a minúsculas
            if (contacto.includes(textoBusqueda)) {
                $(this).parent().show(); // Mostrar el elemento si el texto de búsqueda está presente en el nombre del contacto
            } else {
                $(this).parent().hide(); // Ocultar el elemento si el texto de búsqueda no está presente en el nombre del contacto
            }
        });
    }

    // Agregar evento de entrada al campo de búsqueda para filtrar los contactos mientras el usuario escribe
    $('#inputBuscar').on('input', function() {
        filtrarContactos();
    });

    // Agregar evento al botón "Agregar nuevo contacto" para abrir el formulario emergente
    $("#btnAgregarContacto").click(async function () {
        const { value: formData, dismiss } = await Swal.fire({
            title: 'Agregar Nuevo Contacto',
            html:
                '<input id="nombreApellido" class="swal2-input" placeholder="Nombre y Apellido">' +
                '<input id="numeroCBU" class="swal2-input" placeholder="Número de CBU">' +
                '<input id="alias" class="swal2-input" placeholder="Alias">' +
                '<input id="nombreBanco" class="swal2-input" placeholder="Nombre del Banco">',
            focusConfirm: false,
            showCancelButton: true, // Mostrar el botón "Cancelar"
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar', // Texto del botón "Cancelar"        
            preConfirm: () => {
                const nombreApellido = document.getElementById('nombreApellido').value.trim();
                const numeroCBU = document.getElementById('numeroCBU').value.trim();
                const alias = document.getElementById('alias').value.trim();
                const nombreBanco = document.getElementById('nombreBanco').value.trim();
    
                // Validar que todos los campos estén completos
                if (!nombreApellido || !numeroCBU || !alias || !nombreBanco) {
                    Swal.showValidationMessage('Por favor, complete todos los campos.');
                    return false;
                }
    
                // Validar que el campo "numeroCBU" contenga solo números
                if (!/^\d+$/.test(numeroCBU)) {
                    Swal.showValidationMessage('El campo "Número de CBU" debe contener solo números.');
                    return false;
                }
    
                // Si todas las validaciones pasan, devolvemos el objeto con los datos del formulario
                return { nombreApellido, numeroCBU, alias, nombreBanco };
            },
            allowOutsideClick: () => !Swal.isLoading() // Evitar que se cierre haciendo clic fuera de la ventana emergente
        });            

        // Si se hace clic en el botón "Cancelar", se mantendrá la ventana emergente abierta
        if (dismiss === Swal.DismissReason.cancel) {
            return false;
        }



        // Verificar si todos los campos del formulario están completos
        const camposCompletos = formData && Object.values(formData).every(value => value !== '');

        if (camposCompletos) {
            // Agregar el nuevo contacto al arreglo y guardarlo en localStorage
            const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
            //formData.nombreApellido = formData.nombreApellido.toUpperCase();// Convertir el nombre del contacto a mayúsculas
            contactosGuardados.push(formData);
            localStorage.setItem('contactos', JSON.stringify(contactosGuardados));

            // Recargar la lista de contactos para mostrar el nuevo contacto agregado
            cargarContactos();

            // Confirmar que el contacto se agregó exitosamente
            Swal.fire(
                'Contacto agregado!',
                `Nombre: ${formData.nombreApellido}<br>
                Número de CBU: ${formData.numeroCBU}<br>
                Alias: ${formData.alias}<br>
                Banco: ${formData.nombreBanco}`,
                'success'
            );
        } else if (formData) {
            // Mostrar un mensaje de error si uno o más campos están en blanco
            Swal.fire(
                'Error!',
                'Por favor, complete todos los campos para agregar un nuevo contacto.',
                'error'
            );
        }
    });

    // Agregar evento de clic a los elementos del acordeón para resaltar el contacto seleccionado
    $(document).on('click', '.accordion-button', function() {
        // Remover la clase de resaltado de todos los elementos del acordeón
        $('.accordion-button').removeClass('resaltado');
        // Agregar la clase de resaltado al elemento del acordeón clickeado
        $(this).addClass('resaltado');
        
        // Obtener el nombre del contacto seleccionado
        const nombreContacto = $(this).text();

        // Actualizar el texto del botón "Transferir" con el nombre del contacto seleccionado
        $('#btnTransferir').text(`Transferir dinero a ${nombreContacto}`).show();
    });

    // Función para guardar la información de la transferencia en localStorage
    function guardarTransferencia(contacto, monto) {
        // Obtener las transferencias guardadas en localStorage
        let transferenciasGuardadas = JSON.parse(localStorage.getItem('transferencias')) || [];

        // Crear un objeto que represente la transferencia actual
        const nuevaTransferencia = {
            tipo: "transferenciaRealizada",
            contacto: contacto,
            monto: monto,
            fecha: new Date().toISOString() // Agregar la fecha actual
        };
        console.log("Tipo de movimiento:", nuevaTransferencia.tipo);
        // Agregar la nueva transferencia al arreglo de transferencias
        transferenciasGuardadas.push(nuevaTransferencia);

        // Guardar el arreglo actualizado en localStorage
        localStorage.setItem('transferencias', JSON.stringify(transferenciasGuardadas));

    // Mostrar en consola las transferencias guardadas
    console.log(transferenciasGuardadas);        
    }

    // Agregar evento al botón "Transferir" para mostrar una alerta con el contacto seleccionado
    $("#btnTransferir").click(function() {
        const contactoSeleccionado = $('.accordion-button.resaltado').text();
        const contactoSeleccionadoDetails = $('.accordion-collapse.show .accordion-body').text();
        
        if (contactoSeleccionado) {
            Swal.fire({
                title: 'Transferencia AlkeWallet',
                html:
                    `<p>Estás transfiriendo a:<strong> ${contactoSeleccionado}</strong></p>
                    <hr>
                    <p>${contactoSeleccionadoDetails}</p>
                    <input id="montoTransferencia" class="swal2-input" placeholder="Monto a transferir">`,
                showCancelButton: true,
                confirmButtonText: 'Transferir',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    const montoTransferencia = document.getElementById('montoTransferencia').value;
                    return {
                        contactoSeleccionado: contactoSeleccionado,
                        montoTransferencia: montoTransferencia
                    };
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    // Verificar que el monto no sea menor o igual a 0
                    const monto = parseFloat(result.value.montoTransferencia);
                    if (monto > 0) {
                        // Lógica para transferir dinero al contacto seleccionado
                        const contacto = result.value.contactoSeleccionado;
                        
                        // Restar el monto transferido del saldo actual
                        const saldoActual = parseFloat($('#saldoAmount').text());
                        const nuevoSaldo = saldoActual - monto;
                        $('#saldoAmount').text(nuevoSaldo.toFixed(2));

                        // Guardar la información de la transferencia en localStorage
                        guardarTransferencia(contacto, monto);

                        // Actualizar el saldo en localStorage
                        localStorage.setItem('saldo', nuevoSaldo.toFixed(2));                        

                        Swal.fire(
                            'Transferencia realizada',
                            `Has transferido $${monto} a ${contacto}`,
                            'success'
                        );
                    } else {
                        // Mostrar mensaje de error si el monto es menor o igual a 0
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El monto debe ser mayor que 0. Por favor ingresa un monto válido.'
                        });
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor selecciona un contacto para transferir dinero.'
            });
        }
    });


    // Cargar los contactos al cargar la página
    cargarContactos();
});

$(document).ready(function() {
    // Agregar evento click al botón "Ir al menú principal"
    $("#goToMenu").click(function() {
        // Mostrar la alerta emergente con el mismo formato que las otras alertas
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
            icon: "success", // Especificar el tipo de icono como éxito
            title: "Redirigiendo al menú principal..."
        });

        // Redirigir al usuario a menu.html después de 3 segundos
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 3000);
    });
});
