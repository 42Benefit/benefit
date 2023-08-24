import { PerspectiveCamera } from "three"

const fov = 55
const aspect = window.innerWidth / window.innerHeight
const nearPlane = 1
const farPlane = 20000

export const camera = new PerspectiveCamera(
  fov,
  aspect,
  nearPlane,
  farPlane,
)
camera.position.set(30, 30, 100)
