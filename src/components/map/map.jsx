import React, { useEffect, useRef, useState } from 'react';
import { View, Map as OLMap } from 'ol';
import MapContext from './map.context';
import './map.scss';
import { fromLonLat } from 'ol/proj';

const Map = ({
  children,
  zoom,
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const options = {
      view: new View({ zoom, center: fromLonLat([53.206889, 56.853093]) }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = new OLMap(options);
    mapObject.setTarget(mapRef.current);

    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.getView().setZoom(zoom);
    }
  }, [zoom]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
