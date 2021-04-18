import React, { useRef, useState } from 'react';
import Map from '../map/map';
import { Layers, TileLayer, VectorLayer } from '../layers';
import { osm } from '../source';
import { Controls, FullScreenControl } from '../controls';
import './app.scss';
import { useSelector } from 'react-redux';
import { selectLayers } from '../../redux/selectors/layers.selectors';
import LayersController from '../controls/layers-controller/layers-controller';

const App = () => {
  const zoom = useRef(9);
  const layers = useSelector(selectLayers);
  const [isVisibleOSM, setIsVisibleOSM] = useState(true);

  return (
    <div className='app'>
      <Map zoom={zoom.current}>
        <Layers>
          {isVisibleOSM && (
            <TileLayer
              source={osm()}
              zIndex={0}
            />
          )}
          {Object.values(layers).map(layerObject => layerObject.layers.map(layer => layer.vectors.map((vector, ind) => (
            <VectorLayer
              key={`${layerObject.id}-${layer.id}-${ind}`}
              source={vector instanceof Array ? vector[0] : vector}
              options={ {
                ...layerObject.options,
                ...layer.options,
                style: vector instanceof Array ? vector[1] : layerObject.options.style
              } }
            />
          ))))}
        </Layers>
        <Controls>
          <FullScreenControl />
          <LayersController controls={{ osm: { name: 'Карта OSM', control: setIsVisibleOSM, value: isVisibleOSM } }} />
        </Controls>
      </Map>
    </div>
  );
};

export default App;
