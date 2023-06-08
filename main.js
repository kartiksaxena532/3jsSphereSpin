import * as THREE from 'three'
import "./style.css"
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
//scene
const scene = new THREE.Scene()
//shapes
const geometry = new THREE.SphereGeometry( 3, 64, 64 )
const material = new THREE.MeshStandardMaterial({ color: "#00ff83" ,roughness: 0.1,} )
const mesh = new THREE.Mesh( geometry, material )
scene.add( mesh )
//sizes
const sizes={
  width: window.innerWidth,
  height: window.innerHeight,
}
//light
const light = new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
light.intensity =1.25
scene.add( light )

// camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)


//renderer
const canvas = document.querySelector( '.webgl' )
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render( scene,camera )
//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true 
controls.enablePan = false
controls.enableZoom = false

controls.autoRotate=true
controls.autoRotateSpeed=5
//resize
window.addEventListener('resize', ()=>{
  
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight
   //update camera
   camera.updateProjectionMatrix()
   camera.aspect= sizes.width/sizes.height
   renderer.setSize(sizes.width,sizes.height)

})
const loop = ()=>{
 // mesh.position.x +=0.1 
 //we can use delta time for different pc to renderr same speed
controls.update();
renderer.render( scene, camera);
window.requestAnimationFrame(loop)
}
loop()

//Timeline magiccc
const t1 = gsap.timeline({ defaults: { duration:1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1}) //scaling animation of bulding out of the sphere ek ko bhi chota rakho toh woh nhi hoga baaki ho jyenge
t1.fromTo('nav',{y:'-100%'},{y:'0'})// nav bar ka animation
t1.fromTo('h1',{opacity:0},{opacity:1})//change of opacity of h1 to 1

//mouse animation coloorr
let mouseDown = false
let rgb=[]
window.addEventListener("mousedown",()=>(mouseDown=true))
window.addEventListener("mouseup",()=>(mouseDown=false))
window.addEventListener("mousemove",(e) =>{

  if (mouseDown) {
      rgb=[
        Math.round((e.pageX/sizes.width)*255),
        Math.round((e.pageY/sizes.height)*255),
        150,

      ]
      //LETS ANIMATE
      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)//back ticks hai down excape button
      //new THREE.Color()
      gsap.to(mesh.material.color,{
        r:newColor.r,
        g:newColor.g,
        b:newColor.b,
      })
  }

})





