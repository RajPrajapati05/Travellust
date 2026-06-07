const key = mapToken;

const map = new maplibregl.Map({
  container: "map",
  style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
  center: listing.geometry.coordinates,
  zoom: 9,
});

// Popup
const popup = new maplibregl.Popup({ offset: 25 })
  .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`);

// Marker with popup
new maplibregl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);