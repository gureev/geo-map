import React, { useEffect, useRef, useState } from 'react';
import { View, Map as OLMap } from 'ol';
import MapContext from './map.context';
import './map.scss';

const Map = ({
  children,
  zoom,
  center,
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const options = {
      view: new View({ zoom, center }),
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

  useEffect(() => {
    if (map) {
      map.getView().setCenter(center);
    }
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
