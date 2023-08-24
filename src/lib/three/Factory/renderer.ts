import { WebGLRenderer, ACESFilmicToneMapping } from "three"

export const renderer = new WebGLRenderer({
  antialias: true,
  alpha: false,
  stencil: false,
  precision: "lowp",
  powerPreference: "high-performance",
})

renderer.toneMapping = ACESFilmicToneMapping
console.log(renderer.info)
