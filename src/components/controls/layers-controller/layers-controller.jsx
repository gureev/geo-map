import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayers } from '../../../redux/selectors/layers.selectors';
import Input from '../../input/input';
import { toggleLayerVisibility } from '../../../redux/actions/layers.actions';
import './layers-controller.scss';

const LayersController = () => {
  const layers = useSelector(selectLayers);
  const dispatch = useDispatch();

  const handleCheckbox = (key) => () => dispatch(toggleLayerVisibility(key));

  return (
    <div className='layers-controller'>
      {Object.entries(layers).map(([key, layerObject]) => (
        <Input
          key={key}
          type='checkbox'
          checked={layerObject.options.visible}
          label={layerObject.name}
          onChange={handleCheckbox(key)}
        />
      ))}
    </div>
  );
};

export default LayersController;
