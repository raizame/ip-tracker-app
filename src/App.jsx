import { useEffect, useState } from 'react'
import { Analytics } from "@vercel/analytics/react"
import './App.css'
import subBtn from '/src/assets/ip-address-tracker-master/images/icon-arrow.svg'
import Map from './Map';

function App() {

  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [searchInput, setSearchInput] = useState('')
  const [coords, setCoords] = useState({ lat: 51.505, lng: -0.09 }); 

  const checkIpAddress =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
const checkDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  const getUserIp = async () => {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    return data.ip
  }
  const fetchIp = async (ip='')  => {
    const userIp = ip || (await getUserIp());
    const isIp = checkIpAddress.test(userIp);
    const isDomain = checkDomain.test(userIp);
    
    if (isIp || isDomain) {
      // Construct URL based on whether it's an IP or a domain
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_bDVQu3VUjAWLi0RjZla1y4yg3sETL&${
          isIp ? `ipAddress=${userIp}` : `domain=${userIp}`
        }`
      );
      const data = await res.json();
      console.log(data);
      setIpAddress(data.ip);
      setLocation(`${data.location.city}, ${data.location.region}, ${data.location.country}`);
      setTimezone(`UTC ${data.location.timezone}`);
      setIsp(data.isp);
      setCoords({ lat: data.location.lat, lng: data.location.lng });
    } else {
      console.error("Invalid IP or domain.");
    }
  };

  useEffect(() => {
    fetchIp()
},[])

  function handleSearchClick () {
    if (searchInput.trim() !== '') {
      fetchIp(searchInput.trim()); 
    }
  }

  return (
      <div className='page'>
       <div className='background-container '>
        <h3>IP Address Tracker</h3>

        <div className='input-container'>
        <input placeholder='Search for any IP address or domain' 
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)} 
        onKeyDown={(e) => {if (e.key === 'Enter') handleSearchClick()}}>
        </input>
        <button className='submit' onClick={handleSearchClick}><img src={subBtn}></img></button>
        </div>

        <div className='result-container'>

        <div className='box'>
        <div className="title">IP ADDRESS</div>
        <div className="result">{ipAddress}</div>
        </div>
        <div className="line"></div>
        <div className='box'>
        <div className="title">LOCATION</div>
        <div className="result">{location}</div>
        </div>
        <div className="line"></div>

        <div className='box'>
        <div className="title">TIME ZONE</div>
        <div className="result">{timezone}</div>
        </div>
        <div className="line"></div>

        <div className='box'>
        <div className="title">ISP</div>
        <div className="result">{isp}</div>
        </div>
        </div>
        <Map coords={coords} locationText={location}/>       
        </div>
      </div>
  )
}

export default App
 
