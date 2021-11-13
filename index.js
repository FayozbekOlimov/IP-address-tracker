const API_KEY = 'at_JjVbPkcgp8lgBTuQOILcKeDb5u2wV';
const API_URL = 'https://geo.ipify.org/api/v2/country,city?';

// map
const myMap = L.map('map').setView([50, 50], 5);

const mapIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [32, 32],
    iconAnchpr: [16, 16]
});

const marker = L.marker([50, 50], { icon: mapIcon }).addTo(myMap);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

const form = document.getElementById('form');
const ipInput = document.querySelector('.ip-input');

form.addEventListener('submit', getResult);

async function getResult(e) {
    e.preventDefault();
    const req = await fetch(`${API_URL}apiKey=${API_KEY}&ipAddress=${ipInput.value}`);
    const data = await req.json();

    const { ip, isp, location: {region, country, timezone, lat, lng} } = data;

    document.getElementById('ip').innerText = ip;
    document.getElementById('location').innerText = region + ', ' + country;
    document.getElementById('timezone').innerText = 'UTC ' + timezone;
    document.getElementById('isp').innerText = isp;

    myMap.setView([lat, lng], 16);
    marker.setLatLng([lat, lng]);

    ipInput.value = '';
}
