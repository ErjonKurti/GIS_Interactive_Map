let map;
let markers = [];
const tirana = { lat: 41.3275, lng: 19.8189 };

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        map = new google.maps.Map(document.getElementById("map"), {
          center: userPos,
          zoom: 15,
          mapTypeId: "roadmap"
        });

        new google.maps.Marker({
          position: userPos,
          map,
          animation: google.maps.Animation.BOUNCE,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          },
          title: "Your Location"
        });

        document.getElementById("status").textContent = "Map loaded. Click to add markers.";
        
        map.addListener("click", e => {
          const marker = new google.maps.Marker({
            position: e.latLng,
            map,
            icon: {
              path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 5
            }
          });

          markers.push(marker);

          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            e.latLng,
            new google.maps.LatLng(tirana)
          ).toFixed(2);

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <strong>Koordinatat:</strong><br>
                Lat: ${e.latLng.lat().toFixed(5)}<br>
                Lng: ${e.latLng.lng().toFixed(5)}<br>
                Markues gjithsej: ${markers.length}<br>
                Distanca nga Tirana: ${distance} metra
              </div>
            `
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        });
      },
      error => {
        alert("Pozicioni nuk u gjet. Do të përdoret Tirana si qendër.");
        createMap(tirana);
      }
    );
  } else {
    alert("Browser-i nuk e mbështet gjetjen e pozicionit. Do të përdoret Tirana si qendër.");
    createMap(tirana);
  }

  document.getElementById("clearBtn").addEventListener("click", clearMarkers);
}

function createMap(center) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
    mapTypeId: "roadmap"
  });

  document.getElementById("status").textContent = "Map loaded. Click to add markers.";
  
  map.addListener("click", e => {
    const marker = new google.maps.Marker({
      position: e.latLng,
      map,
      icon: {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 5
      }
    });

    markers.push(marker);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      e.latLng,
      new google.maps.LatLng(tirana)
    ).toFixed(2);

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <strong>Koordinatat:</strong><br>
          Lat: ${e.latLng.lat().toFixed(5)}<br>
          Lng: ${e.latLng.lng().toFixed(5)}<br>
          Markues gjithsej: ${markers.length}<br>
          Distanca nga Tirana: ${distance} metra
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

function clearMarkers() {
  markers.forEach(marker => {
    marker.setMap(null);
  });
  markers = [];
}