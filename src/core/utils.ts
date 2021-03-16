import { Fill, Text } from 'ol/style';

export function createTextStyle(
  feature,
  resolution,
  labelText = '',
  labelFont = '1rem, sans-serif',
  labelFill = 'rgba(0, 0, 0, 1)',
  placement = 'point',
) {
  if (!feature.hide || labelText) {
    return;
  }

  const textStyle = new Text({
    font: labelFont,
    text: labelText,
    textBaseline: 'middle',
    textAlign: 'left',
    offsetX: 8,
    offsetY: 3,
    placement,
    maxAngle: 0,
    fill: new Fill({
      color: labelFill,
    }),
  });

  return textStyle;
}
