document.addEventListener("DOMContentLoaded", function () {
    const garden = document.getElementById('garden');

    garden.addEventListener('click', function (event) {
        const flower = document.createElement('img');
        flower.src = 'images/flower.png'; // Path to your flower image
        flower.className = 'flower';
        flower.style.left = event.clientX - 25 + 'px'; // Adjust to center the flower
        flower.style.top = event.clientY - 25 + 'px';  // Adjust to center the flower

        garden.appendChild(flower);
    });
});