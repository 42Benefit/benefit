import Stats from "three/examples/jsm/libs/stats.module.js";

export let stats: Stats | undefined;
if (process.env.NODE_ENV === "development") {
  stats = new Stats();
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}
