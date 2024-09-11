mapboxgl.accessToken = 'pk.eyJ1IjoiaHV5aGExNzA1IiwiYSI6ImNtMHdsbnF6NzAyemgybHExeG1hc3Z3djkifQ.HZG1Idf72pop2QSHkf7vug'; 
  
const hoChiMinhCity = [106.6602, 10.762622]; 


const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: hoChiMinhCity, 
  zoom: 12 
});


let marker = new mapboxgl.Marker()
  .setLngLat(hoChiMinhCity)
  .addTo(map);

let popup = new mapboxgl.Popup()
  .setHTML('<div class="info-card"><h3>Ho Chi Minh City</h3><p>Coordinates: [106.6602, 10.762622]</p></div>')
  .setLngLat(hoChiMinhCity)
  .addTo(map);

marker.setPopup(popup); 


function updateMarker(lngLat, placeName) {
  const infoCard = document.createElement('div');
  infoCard.className = 'info-card';
  infoCard.innerHTML = `<h3>${placeName}</h3><p>Coordinates: ${lngLat}</p>`;
  
  popup.setDOMContent(infoCard); 
  popup.setLngLat(lngLat); 

  marker.setLngLat(lngLat)
    .setPopup(popup) 
    .addTo(map); 
  
  map.flyTo({ center: lngLat, zoom: 12 }); 
}


function fetchSuggestions(query) {
  const accessToken = mapboxgl.accessToken;
  if (query.length < 3) {
    document.getElementById('suggestions').innerHTML = '';
    return;
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&autocomplete=true&limit=5`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const suggestions = data.features.map(feature => {
        return `<li data-coordinates="${feature.geometry.coordinates}" data-name="${feature.place_name}">${feature.place_name}</li>`;
      }).join('');

      document.getElementById('suggestions').innerHTML = suggestions;

     
      document.querySelectorAll('#suggestions li').forEach(li => {
        li.addEventListener('click', function () {
          const coords = this.getAttribute('data-coordinates').split(',').map(Number);
          const placeName = this.getAttribute('data-name');
          updateMarker(coords, placeName); 
          document.getElementById('suggestions').innerHTML = ''; 
          document.getElementById('location-input').value = this.textContent; 
        });
      });
    });
}


document.getElementById('location-input').addEventListener('input', function () {
  fetchSuggestions(this.value);
});
