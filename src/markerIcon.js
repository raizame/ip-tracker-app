import icon from '/src/assets/ip-address-tracker-master/images/icon-location.svg'
import L from "leaflet"

export default L.icon({
  iconSize: [30,40],
  iconAnchor: [10,40],
  popupAnchor: [6,-40],
  iconUrl: icon,
})