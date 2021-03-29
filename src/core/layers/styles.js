import { Circle, Fill, Stroke, Style, } from 'ol/style';
import { createTextStyle } from '../utils';

export const border = (feature, resolution) => new Style({
  stroke: new Stroke({
    color: 'rgba(238, 20, 16, 1.0)',
    lineDash: null,
    lineCap: 'square',
    lineJoin: 'bevel',
    width: 0,
  }),
  text: createTextStyle(feature, resolution, '', null,
    null, 'line'),
});

export const region = (feature, resolution) => [
  new Style({
    stroke: new Stroke({
      color: 'rgba(114, 133, 132, 1.0)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(222, 255, 255, 0.35)' }),
    text: createTextStyle(feature, resolution),
  }),
];

export const river = (feature, resolution) => [
  new Style({
    stroke: new Stroke({
      color: 'rgba(81, 10, 146, 1.0)',
      lineDash: null,
      lineCap: 'square',
      lineJoin: 'bevel',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(222, 255, 255, 1.0)' }),
    text: createTextStyle(feature, resolution, null, null, null, 'line'),
  }),
];

export const city = (feature, resolution) => [
  new Style({
    image: new Circle({
      radius: 4.0,
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 1.0)',
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 0,
      }),
      fill: new Fill({ color: 'rgba(231, 50, 247, 1.0)' }),
    }),
    text: createTextStyle(feature, resolution),
  }),
];

export const oopt = (feature, resolution) => [
  new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 1.0)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(6, 240, 240, 0.35)' }),
    text: createTextStyle(feature, resolution),
  }),
];
