import React, { useRef } from 'react';
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

  return (
    <div className='app'>
      <Map zoom={zoom.current}>
        <Layers>
          <TileLayer
            source={osm()}
            zIndex={0}
          />
          {Object.values(layers).map(layerObject => layerObject.layers.map(layer => layer.vectors.map((vector, ind) => (
            <VectorLayer
              key={`${layerObject.id}-${layer.id}-${ind}`}
              source={vector}
              options={ { ...layerObject.options, ...layer.options } }
            />
          ))))}
        </Layers>
        <Controls>
          <FullScreenControl />
          <LayersController />
        </Controls>
      </Map>
    </div>
  );
};

export default App;
