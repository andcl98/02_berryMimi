import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */

const mimiLoader = new GLTFLoader()

mimiLoader.load(
    '/models/Mimi/mimi.gltf',
    (mimi) =>
    { 
        for(let i = 0; i<5; i++){
        let copy = mimi.scene.clone()
        copy.position.set(i-2,i-2, 0)
        copy.scale.set(0.1, 0.1, 0.1)
        scene.add(copy)

        mimi.scene.scale.set(0.2, 0.2, 0.2)
        mimi.scene.position.set(-2, 0, 0)
        scene.add(mimi.scene)

        let animate = () =>{
        mimi.scene.rotation.y+=0.005
        copy.rotation.x+=0.003
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
        }
        animate()
    }
}
)

/**
 * Lights
 */

let color1 = 0xF2E9CD
const directionalLight1 = new THREE.DirectionalLight(color1, 2)
directionalLight1.position.set(- 5, 5, 0)
scene.add(directionalLight1)

let color2 = 0x058d9c
const directionalLight2 = new THREE.DirectionalLight(color2, 0.9)
directionalLight2.position.set(0, 0, 2.4)
scene.add(directionalLight2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 3)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()