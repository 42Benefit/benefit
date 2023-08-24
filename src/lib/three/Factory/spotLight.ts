import { SpotLight } from "three"

export const spotLight = new SpotLight(0xffffff, 42)

spotLight.position.set(0, 42, -10)
spotLight.castShadow = true
spotLight.visible = false
