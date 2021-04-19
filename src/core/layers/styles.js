import { Circle, Fill, Stroke, Style, } from 'ol/style';

export const border = new Style({
  stroke: new Stroke({
    color: 'rgba(238, 20, 16, 1.0)',
    lineDash: null,
    lineCap: 'square',
    lineJoin: 'bevel',
    width: 0,
  }),
});

export const region = [
  new Style({
    stroke: new Stroke({
      color: 'rgba(114, 133, 132, 1.0)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(222, 255, 255, 0.35)' }),
  }),
];

export const river = [
  new Style({
    stroke: new Stroke({
      color: 'rgba(81, 10, 146, 1.0)',
      lineDash: null,
      lineCap: 'square',
      lineJoin: 'bevel',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(222, 255, 255, 1.0)' }),
  }),
];

export const city = [
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
  }),
];

export const oopt = [
  new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 1.0)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(222,124,124,0.3)' }),
  }),
];

export const seas = [
  new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 1.0)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0,
    }),
    fill: new Fill({ color: 'rgba(6, 240, 240, 0.3)' }),
  }),
];

export const noise = (color) => [
  new Style({
    stroke: new Stroke({
      color,
      lineDash: null,
      lineCap: 'square',
      lineJoin: 'bevel',
      width: 4
    }),
  })
];

export const landscaping = (fillColor) => [
  new Style({
    stroke: new Stroke({
      color: 'rgba(35,35,35,0.5)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0
    }),
    fill: new Fill({ color: fillColor }),
  })
];

export const industrialZones = [
  new Style({
    stroke: new Stroke({
      color: 'rgba(35, 35, 35, 1.0)',
      lineDash: null,
      lineCap: 'butt',
      lineJoin: 'miter',
      width: 0
    }),
    fill: new Fill({ color: 'rgba(231, 113, 72, 0.6)' }),
  })
];
