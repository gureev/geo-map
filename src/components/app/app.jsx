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
  const zoom = useRef(11);
  const regions = useSelector(selectLayers);
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
          {Object.entries(regions).map(([regionKey, region]) => Object.entries(region.subjects).map((([subjectKey, subject]) =>
            subject.vectors.map((vector, ind) => (
              <VectorLayer
                key={`${regionKey}-${subjectKey}-${ind}`}
                source={vector instanceof Array ? vector[0] : vector}
                options={ {
                  ...region.options,
                  ...subject.options,
                  style: vector instanceof Array ? vector[1] : (subject.options.style ?? region.options.style)
                } }
              />
            ))
          )))}
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
