document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Zapobiega domy�lnej akcji przesy�ania formularza

    var formData = new FormData(this); // Pobierz dane z formularza

    // Wysy�ka danych za pomoc� AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_register.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert("Registration successful!");
                // Przekierowanie u�ytkownika do innej strony po udanej rejestracji
                window.location.href = "login.html";
            } else {
                alert("Error: " + xhr.responseText);
            }
        }
    };
    xhr.send(formData);
});
