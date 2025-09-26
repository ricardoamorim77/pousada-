document.addEventListener("DOMContentLoaded", function() {

    // --- SCROLL SUAVE PARA ÂNCORAS DO MENU ---
    document.querySelectorAll("nav a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector(".navbar").offsetHeight, // Ajusta para o menu fixo
                    behavior: "smooth"
                });
            }
        });
    });

    // --- LÓGICA DO FORMULÁRIO DE RESERVA (APENAS NA PÁGINA reserva.html) ---
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        const bookingTypeSelect = document.getElementById("booking_type");
        const hospedagemFields = document.getElementById("hospedagem-fields");
        const dayuseFields = document.getElementById("dayuse-fields");
        const whatsappNumber = "5577000000000"; // NÚMERO DE WHATSAPP PARA ONDE ENVIAR A MENSAGEM

        // Função para mostrar/esconder campos com base na seleção
        function toggleBookingFields() {
            if (bookingTypeSelect.value === "hospedagem") {
                hospedagemFields.style.display = "block";
                dayuseFields.style.display = "none";
            } else {
                hospedagemFields.style.display = "none";
                dayuseFields.style.display = "block";
            }
        }

        // Inicializa os campos corretos ao carregar a página
        toggleBookingFields();
        bookingTypeSelect.addEventListener("change", toggleBookingFields);

        // Preencher tipo de reserva se vier da URL (ex: reserva.html?type=day_use)
        const urlParams = new URLSearchParams(window.location.search);
        const preselectedType = urlParams.get("type");
        if (preselectedType && (preselectedType === "hospedagem" || preselectedType === "day_use")) {
            bookingTypeSelect.value = preselectedType;
            toggleBookingFields();
        }

        // Lógica de envio do formulário para o WhatsApp
        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const bookingType = bookingTypeSelect.value;

            let message = `Olá, Pousada Paraíso! Meu nome é ${name} e gostaria de fazer uma solicitação de reserva.\n\n`;
            message += `*Tipo de Solicitação:* ${bookingType === "hospedagem" ? "Hospedagem (Pernoite)" : "Day Use"}\n`;

            if (bookingType === "hospedagem") {
                const checkin = document.getElementById("checkin").value;
                const checkout = document.getElementById("checkout").value;
                const roomType = document.getElementById("room_type").value;
                const guests = document.getElementById("guests").value;

                message += `*Check-in:* ${checkin ? checkin : "Não informado"}\n`;
                message += `*Check-out:* ${checkout ? checkout : "Não informado"}\n`;
                message += `*Acomodação:* ${roomType}\n`;
                message += `*Número de Hóspedes (Adultos):* ${guests}\n`;
            } else { // Day Use
                const dayuseDate = document.getElementById("dayuse_date").value;
                const adults = document.getElementById("adults").value;
                const children = document.getElementById("children").value;

                message += `*Data da Visita:* ${dayuseDate ? dayuseDate : "Não informada"}\n`;
                message += `*Número de Adultos:* ${adults}\n`;
                message += `*Número de Crianças (6-12 anos):* ${children}\n`;
            }

            message += `\nAguardo o contato de vocês para mais detalhes. Obrigado!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, "_blank");
        });
    }
});
