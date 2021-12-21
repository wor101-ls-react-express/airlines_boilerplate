import React from 'react'

const Svg = ({ routes, airports }) => {

  return (
    <svg className="map" viewBox="-180 -90 360 180">
    <g transform="scale(1 -1)">
      <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
      
      { routes.map((route, index) => {
        const srcAirport = airports.find(airport => airport.code === route.src)
        const x1 = srcAirport.long
        const y1 = srcAirport.lat

        const destAirport = airports.find(airport => airport.code === route.dest)
        const x2 = destAirport.long
        const y2 = destAirport.lat
        

          return (
            <g key={index}>
              <circle className="source" cx={x1} cy={y1}>
                <title></title>
              </circle> 
              <circle className="destination" cx={x2} cy={y2}>
                <title></title>
              </circle>
              <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
            </g>
          )
        })
      }
      
    </g>
  </svg>
  )
}

export default Svg