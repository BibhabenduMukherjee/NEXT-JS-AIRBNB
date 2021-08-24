import {useState} from 'react'
import ReactMapGL ,{Marker , Popup}from 'react-map-gl';
import getCenter  from 'geolib/es/getCenter';
function Map({searchResults}) {
    
   const [selectedLocation , setSelectedLocation ] = useState({})
    
// transfrom this object in latitude and longitude

const coordinate = searchResults?.map((result)=>({
  
  latitude:result.lat,
  longitude: result.long,
}))


const center = getCenter(coordinate)
const [viewport , setViewort] = useState({
    width: '100%',
    height:'100%',
    latitude:center.latitude,
    longitude: center.longitude,
    zoom:11,

})

    return <ReactMapGL
    mapStyle ='mapbox://styles/bibhabendumukherjee/cksolgyh8fxwl17pj9fb87jbx'
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport)=>setViewort(nextViewport)}
    >
   {searchResults.map(result=>(
     <div key={result.long}>
      <Marker
      longitude = {result.long}
      latitude = {result.lat}
      offsetLeft={-20}
      offsetTop={-10}

      >
     <p onClick={()=>{setSelectedLocation(result)}} 
     className='cursor-pointer text-2xl animate-bounce'
     role='img'
     aria-label='push-pin'
     >
       📌
     </p>
      </Marker>

     {/* click on the marker show the popup */}

     {selectedLocation.long === result.long ?(
     <Popup
     onClose = {()=> setSelectedLocation({})}
     closeOnClick = {true}
     latitude = {result.lat}
     longitude = {result.long}

     >
    {result.title}
     </Popup>
     ) : (
       false
     )}

     </div>
   ))}
    </ReactMapGL>
      
    
}

export default Map
