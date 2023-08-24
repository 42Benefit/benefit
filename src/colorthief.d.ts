declare module 'colorthief' {
  type Color = [number, number, number];
  export default class ColorThief {
    getColor: (img: HTMLImageElement | null, quality?: number) => Color;
    getPalette: (img: HTMLImageElement | null, colorCount?: number, quality?: number) => Color[];
  }
}
