window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

    setTimeout(function() {
        document.getElementById("loader").style.top = "-100vh";
    }, 1000);

    const inputs = document.querySelectorAll(
        'input:not(input[type="submit"]), textarea'
    );

    inputs.forEach(e => {
        e.addEventListener("click", function () {
            inputs.forEach(e => {
                e.style.borderBottom = "2px solid #c96432";
            });
            e.style.borderBottom = "2px solid #000000";
        });
    });

    // ✅ FORMULAIRE
    const form = document.querySelector(".form-contact");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nom = document.querySelector('input[name="nom"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // 🔒 Vérification
        if (nom.trim() === "" || email.trim() === "" || message.trim() === "") {
            alert("Tous les champs sont obligatoires");
            return;
        }

        // 🚀 ENVOI VERS FORMSPREE
        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {

                if (!document.querySelector(".success-message")) {
                    const success = document.createElement("p");
                    success.classList.add("success-message");
                    success.innerText = "Message envoyé avec succès !";
                    form.appendChild(success);
                }

                form.reset();

            } else {
                alert("Erreur lors de l'envoi");
            }
        })
        .catch(error => {
            alert("Problème de connexion");
        });
    });
});


