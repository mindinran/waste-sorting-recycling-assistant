// script2.js - Guide Page Logic

document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        wasteSearch: document.getElementById('waste-search'),
        searchResults: document.getElementById('search-results'),
        wasteImage: document.getElementById('waste-image'),
        fileLabelText: document.getElementById('file-label-text'),
        imagePreview: document.getElementById('image-preview'),
        guideDetails: document.getElementById('guide-details'),
        guideTitle: document.getElementById('guide-title'),
        guideContent: document.getElementById('guide-content'),
        closeBtn: document.getElementById('close-btn'),
        imageResults: document.getElementById('image-results'),
        identifiedWaste: document.getElementById('identified-waste'),
        wasteInstructions: document.getElementById('waste-instructions')
    };

    const wasteData = {
        plastic: {
            title: "Plastic Recycling Guide",
            icon: "🧴",
            keywords: ["bottle", "container", "bag", "wrapper", "plastic"],
            content: `
                <h3>♻ How to Recycle Plastic</h3>
                <p><strong>Recyclable:</strong> Bottles (water, soda, shampoo), containers (yogurt, margarine), jugs (milk, detergent)</p>
                <p><strong>Not Recyclable:</strong> Plastic bags, straws, styrofoam, plastic wrap</p>
                <ul>
                    <li>Rinse containers before recycling</li>
                    <li>Remove caps and lids</li>
                    <li>Place loose in bin</li>
                </ul>
            `
        },
        paper: {
            title: "Paper Recycling Guide",
            icon: "📄",
            keywords: ["newspaper", "cardboard", "magazine", "box", "paper"],
            content: `
                <h3>♻ How to Recycle Paper</h3>
                <p><strong>Recyclable:</strong> Newspapers, magazines, office paper, cardboard boxes, paper bags</p>
                <p><strong>Not Recyclable:</strong> Soiled paper, wax-coated paper, receipts, paper towels</p>
                <ul>
                    <li>Flatten cardboard</li>
                    <li>Remove plastic windows from envelopes</li>
                    <li>Keep paper dry and clean</li>
                </ul>
            `
        },
        glass: {
            title: "Glass Recycling Guide",
            icon: "🍾",
            keywords: ["bottle", "jar", "glass", "container"],
            content: `
                <h3>♻ How to Recycle Glass</h3>
                <p><strong>Recyclable:</strong> Bottles (beer, wine, soda), jars (jam, sauce)</p>
                <p><strong>Not Recyclable:</strong> Ceramics, light bulbs, mirrors</p>
                <ul>
                    <li>Rinse thoroughly</li>
                    <li>Remove metal lids</li>
                    <li>Do not break the glass</li>
                </ul>
            `
        },
        metal: {
            title: "Metal Recycling Guide",
            icon: "🥫",
            keywords: ["can", "foil", "metal", "tin"],
            content: `
                <h3>♻ How to Recycle Metal</h3>
                <p><strong>Recyclable:</strong> Aluminum cans, tin cans, clean foil</p>
                <p><strong>Not Recyclable:</strong> Paint cans, propane tanks</p>
                <ul>
                    <li>Rinse cans</li>
                    <li>Flatten if possible</li>
                    <li>Check for local scrap metal rules</li>
                </ul>
            `
        },
        organic: {
            title: "Organic Waste Guide",
            icon: "🍎",
            keywords: ["food", "compost", "yard", "organic"],
            content: `
                <h3>♻ How to Handle Organic Waste</h3>
                <p><strong>Compostable:</strong> Fruits, vegetables, eggshells, yard trimmings</p>
                <p><strong>Not Compostable:</strong> Meat, dairy, pet waste</p>
                <ul>
                    <li>Use a compost bin</li>
                    <li>Mix green and brown waste</li>
                    <li>Keep compost moist</li>
                </ul>
            `
        },
        hazardous: {
            title: "Hazardous Waste Guide",
            icon: "⚠️",
            keywords: ["battery", "chemical", "electronic", "hazardous"],
            content: `
                <h3>⚠ Hazardous Waste Disposal</h3>
                <p><strong>Hazardous Items:</strong> Batteries, electronics, paint, chemicals</p>
                <p><strong>Do NOT place in regular trash or recycling</strong></p>
                <ul>
                    <li>Find hazardous waste collection sites</li>
                    <li>Keep in original containers</li>
                    <li>Never pour down the drain</li>
                </ul>
            `
        }
    };

    window.searchWaste = function () {
        const query = elements.wasteSearch.value.trim().toLowerCase();
        elements.searchResults.innerHTML = '';
        if (!query) {
            elements.searchResults.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        let matched = null;
        for (const key in wasteData) {
            const category = wasteData[key];
            if (category.keywords.some(k => k.includes(query)) || key.includes(query)) {
                matched = key;
                break;
            }
        }

        if (matched) {
            showGuide(matched);
        } else {
            elements.searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
        }
    };

    window.showGuide = function (key) {
        const category = wasteData[key];
        if (!category) return;
        elements.guideTitle.textContent = category.title;
        elements.guideContent.innerHTML = category.content;
        elements.guideDetails.classList.remove('hidden');
        elements.guideDetails.scrollIntoView({ behavior: 'smooth' });
    };

    window.closeGuide = function () {
        elements.guideDetails.classList.add('hidden');
    };

    elements.wasteImage?.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        elements.fileLabelText.textContent = file.name;
        const reader = new FileReader();
        reader.onload = evt => {
            elements.imagePreview.innerHTML = `<img src="${evt.target.result}" alt="Uploaded Image" style="max-width: 200px;">`;
        };
        reader.readAsDataURL(file);
    });

    window.identifyWaste = function () {
        const file = elements.wasteImage?.files?.[0];
        if (!file) {
            alert('Please upload an image first.');
            return;
        }

        // Simulated result for demonstration
        const result = { name: 'Plastic Bottle', category: 'plastic', confidence: 0.92 };
        elements.imageResults.classList.remove('hidden');
        elements.identifiedWaste.textContent = `Identified as: ${result.name} (${Math.round(result.confidence * 100)}%)`;
        elements.wasteInstructions.innerHTML = wasteData[result.category]?.content || '<p>No instructions found.</p>';
    };
});
function initMap() {
  const defaultLocation = { lat: 6.9271, lng: 79.8612 }; // Colombo
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
  });

  infowindow = new google.maps.InfoWindow();

  // Add hardcoded recycling center markers
  const locations = [
    { lat: 6.9271, lng: 79.8612, name: "Center 1" },
    { lat: 6.9345, lng: 79.8428, name: "Center 2" },
    { lat: 6.9157, lng: 79.8785, name: "Center 3" },
  ];

  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.name,
    });

    marker.addListener("click", () => {
      infowindow.setContent(`<strong>${loc.name}</strong>`);
      infowindow.open(map, marker);
    });
  });

  // Search functionality
  const input = document.getElementById("location-input");
  const button = document.getElementById("location-search-btn");
  const resultsDiv = document.getElementById("results");

  if (input && button && resultsDiv) {
    button.addEventListener("click", () => {
      const address = input.value.trim();
      if (!address) {
        alert("Please enter a location.");
        return;
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(14);

          // Clear old markers
          clearMarkers();
          resultsDiv.innerHTML = "";

          const request = {
            location: location,
            radius: 5000,
            keyword: "recycling center",
          };

          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, (places, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && places.length > 0) {
              showLocationResults(places);
            } else {
              resultsDiv.innerHTML = "<p>No recycling centers found nearby.</p>";
            }
          });
        } else {
          alert("Geocode failed: " + status);
        }
      });
    });
  }
}

function showLocationResults(places) {
  const resultsDiv = document.getElementById("results");

  places.forEach((place, index) => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.innerHTML = `<strong>${place.name}</strong><br>${place.vicinity || ''}`;

    div.addEventListener("click", () => {
      google.maps.event.trigger(markers[index], 'click');
      map.panTo(markers[index].getPosition());
    });

    resultsDiv.appendChild(div);

    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });

    marker.addListener("click", () => {
      infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity || ''}`);
      infowindow.open(map, marker);
    });

    markers.push(marker);
  });
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}
