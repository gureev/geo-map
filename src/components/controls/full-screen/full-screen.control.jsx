import { useContext, useEffect } from 'react';
import { FullScreen } from 'ol/control';
import MapContext from '../../map/map.context';
import './full-screen.scss';

const FullScreenControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) {
      return;
    }
    const fullScreenControl = new FullScreen({
      className: 'control-full-screen',
      activeClassName: 'control-full-screen__button',
      inactiveClassName: 'control-full-screen__button',
      tipLabel: 'Полноэкранный режим'
    });
    map.controls.push(fullScreenControl);

    return () => map.controls.remove(fullScreenControl);
  }, [map]);

  return null;
};
export default FullScreenControl;
