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
  const regions = useSelector(selectLayers);

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
      {Object.entries(regions).map(([key, region]) => (
        <li key={key} className='layers-controller__element'>
          <Input
            type='checkbox'
            checked={region.options.visible}
            label={region.name}
            onChange={handleCheckbox(key)}
          />
          {Object.entries(region.subjects).map(([subjectKey, subject]) => (
            <ul className='layers-controller__sublist' key={subjectKey}>
              <li className='layers-controller__element'>
                <Input
                  type='checkbox'
                  checked={subject.options.visible}
                  label={subject.name}
                  onChange={handleSublayerCheckbox(key, subjectKey)}
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
