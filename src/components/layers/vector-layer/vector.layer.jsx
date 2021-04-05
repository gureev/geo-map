import { useContext, useEffect } from 'react';
import MapContext from "../../map/map.context";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, options = {} }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) {
      return;
    }

    const vectorLayer = new OLVectorLayer({
      declutter: true,
      source,
      ...options
    });
    map.addLayer(vectorLayer);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, options]);

  return null;
};
export default VectorLayer;
