import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayers } from '../../../redux/selectors/layers.selectors';
import Input from '../../input/input';
import { toggleLayerVisibility, toggleSubLayerVisibility } from '../../../redux/actions/layers.actions';
import './layers-controller.scss';

const LayersController = ({
  controls = {}
}) => {
  const dispatch = useDispatch();
  const layers = useSelector(selectLayers);

  const handleCheckbox = (key) => () => dispatch(toggleLayerVisibility(key));
  const handleSublayerCheckbox = (key, sublayerKey) => () => dispatch(toggleSubLayerVisibility(key, sublayerKey));

  const handleControl = control => ({ target: { checked } }) => control(checked);

  return (
    <ul className='layers-controller'>
      {Object.entries(controls).map(([key, { name, control, value }]) => (
        <li key={key} className='layers-controller__element'>
          <Input
            type='checkbox'
            checked={value}
            label={name}
            onChange={handleControl(control)}
          />
        </li>
      ))}
      {Object.entries(layers).map(([key, layerObject]) => (
        <li key={key} className='layers-controller__element'>
          <Input
            type='checkbox'
            checked={layerObject.options.visible}
            label={layerObject.name}
            onChange={handleCheckbox(key)}
          />
          {layerObject.layers.map(sublayer => sublayer.key && (
            <ul className='layers-controller__sublist' key={sublayer.id}>
              <li className='layers-controller__element'>
                <Input
                  type='checkbox'
                  checked={sublayer.options.visible}
                  label={sublayer.name}
                  onChange={handleSublayerCheckbox(key, sublayer.key)}
                />
              </li>
            </ul>
          ))}
        </li>
      ))}
    </ul>
  );
};

export default LayersController;
