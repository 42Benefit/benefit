import { Sky } from "three/examples/jsm/objects/Sky.js";

export const sky = new Sky();

sky.scale.setScalar(10000);

const skyUniforms = sky.material.uniforms;
skyUniforms["turbidity"].value = 10;
skyUniforms["rayleigh"].value = 2;
skyUniforms["mieCoefficient"].value = 0.005;
skyUniforms["mieDirectionalG"].value = 0.8;
