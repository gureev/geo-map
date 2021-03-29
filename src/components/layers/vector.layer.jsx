import { useContext, useEffect } from "react";
import MapContext from "../map/map.context";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, style, options = {} }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) {
      return;
    }

    const vectorLayer = new OLVectorLayer({
      source,
      style,
      ...options
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(options.zIndex ?? 1);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, options]);

  return null;
};
export default VectorLayer;
