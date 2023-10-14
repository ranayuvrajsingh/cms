import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { FastField } from 'formik';


const LocationPicker = ({setVenues, place, editing, ...props }) => {
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Set default center to San Francisco
  const [zoom, setZoom] = useState(11); // Set default zoom level
  const [query, setQuery] = useState("");
  const [addressObj, setAddressObj] = useState({});
  const autoCompleteRef = useRef(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  console.log('place',place,editing);

  useEffect(() => {
    setQuery(place?.[2]);
    setLatitude(place?.[0]);
    setLongitude(place?.[1]);
  }, [editing]);

  let autoComplete;
  let addressObject;
const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    // { types: ["(cities)"], componentRestrictions: { country: "in" } }
  );
 
  autoComplete.setFields(["name","address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
  
}

async function handlePlaceSelect(updateQuery) {
   addressObject = autoComplete.getPlace();
  const query = addressObject.name+' '+addressObject.formatted_address;
  updateQuery(query);
  setAddressObj(addressObject);
  console.log(addressObject);
}
console.log('>>>>',query)

useEffect(() => {
  var geocoder = new window.google.maps.Geocoder();

geocoder.geocode({
  'address': addressObj?.name+' '+addressObj?.formatted_address
}, function(results, status) {

  if (status == window.google.maps.GeocoderStatus.OK) {
     let lati = results[0].geometry.location.lat();
     let longi = results[0].geometry.location.lng();
     setLatitude(lati);
      setLongitude(longi);
      setVenues([lati,longi,query])
    
  }
}); }, [addressObj]);





  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBwu-peExuFzakZlyfpGscHw_stvbitnTs&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);


  return (
    <div className='mt-4'>
      <input
      style={{ width: '100%', height: '40px', paddingLeft: 16, marginBottom: 8 }}
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a place"
        value={query}
        
      />
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBwu-peExuFzakZlyfpGscHw_stvbitnTs' }}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
      /> */}
      <div>Latitude: {latitude} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Longitude: {longitude}</div>
      
    </div>
  );
};

export default LocationPicker;