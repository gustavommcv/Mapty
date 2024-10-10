'use strict';

const workout = document.querySelector('.workout');

const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputType = document.querySelector('.form__input--type');
const inputElevation = document.querySelector('.form__input--elev');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let map;
let mapEvent;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    
        function(position) {
            const {latitude} = position.coords;
            const {longitude} = position.coords;

            const coords = [latitude, longitude];

            map = L.map('map').setView(coords, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Handling clicks on map
            map.on('click', function(mapE) {
                workout.classList.remove('hidden');
                inputDistance.focus();

                mapEvent = mapE;
            });
        }, 
    
        function() {
            alert('Could not get your position');
        }
    );
}

workout.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputCadence.value = inputDuration.value = '';

    // Display marker
    const {lat, lng} = mapEvent.latlng;

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
        }))
        .setPopupContent('Workout')
        .openPopup();
});

inputType.addEventListener('change', function() {
    inputElevation.closest('.form__inputs').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__inputs').classList.toggle('form__row--hidden');
});
