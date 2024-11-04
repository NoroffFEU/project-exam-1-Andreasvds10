// Henter modal-element og kontrollknapper
const modal = document.getElementById("forgotPasswordModal"); // Modalvinduet
const forgotPasswordLink = document.querySelector(".forgot-password a"); // "Forgot Password?"-lenken
const closeModal = document.querySelector(".close"); // "Lukk"-knappen ("X") i modalvinduet
const resetEmailInput = document.getElementById("resetEmail"); // E-postfeltet i modalvinduet
const sendResetEmailButton = document.getElementById("sendResetEmail"); // Knappen for å sende e-post

// Åpner modalvinduet når "Forgot Password?"-lenken klikkes
forgotPasswordLink.onclick = function() {
    modal.style.display = "block";
}

// Lukker modalvinduet når "X"-knappen klikkes
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Lukker modalvinduet hvis brukeren klikker utenfor det
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Sender passordtilbakestillingsforespørsel når knappen "Send Email" klikkes
sendResetEmailButton.onclick = async function() {
    const email = resetEmailInput.value; // Henter e-postadressen fra input-feltet
    if (!email) {
        alert("Please enter your email address."); // Viser en melding hvis feltet er tomt
        return;
    }

    try {
        const response = await fetch('/api/reset-password', { // URL for backend-endepunktet
            method: 'POST', // HTTP-metoden som brukes
            headers: { 'Content-Type': 'application/json' }, // Angir at dataene sendes som JSON
            body: JSON.stringify({ email }) // Sender e-posten som JSON-data
        });

        if (response.ok) {
            alert("A password reset email has been sent. Please check your inbox.");
            modal.style.display = "none"; // Lukker modalvinduet ved suksess
        } else {
            const data = await response.json();
            alert(data.message || "Failed to send reset email."); // Viser feilmelding
        }
    } catch (error) {
        console.error("Error:", error); // Logger feilen i konsollen
        alert("An error occurred. Please try again."); // Viser feilmelding til brukeren
    }
}

