const container= document.querySelector(".scene");
const btn = document.getElementById("cam_btn");
let cam_count = 1;
let cam_num = 1;
let model;
//creating scene
const scene = new THREE.Scene();

//Renderer
const renderer = new THREE.WebGLRenderer({antialias:true ,alpha:true});
renderer.setSize(container.clientWidth,container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

//setting camera
let aspect = container.clientWidth/container.clientHeight;
const camera = new THREE.PerspectiveCamera(55,aspect,1,50000);
camera.position.set(0,2,5);

//camera 2
const camera2 = new THREE.PerspectiveCamera(55,aspect,1,5000);
camera2.position.set(0,3,-6);
camera2.rotation.y = 180*Math.PI/180;
camera2.rotation.x = 30*Math.PI/180;
scene.add(camera2);

//cam variable
let c = camera;

//Lights
const ambient = new THREE.AmbientLight(0xffffff,3);
const directional = new THREE.DirectionalLight(0xffffff,1);
directional.position.set(-10,10,10);
scene.add(directional);
scene.add(ambient);

//Model loader
const loader = new THREE.GLTFLoader();
loader.load("./models/Car.gltf",function(gltf){
    scene.add(gltf.scene);
    model = gltf.scene.children[0];
    animate();
});
//Controls
let controls = new THREE.OrbitControls(c,renderer.domElement);
//Camera change function
function cam_change(){
    if(cam_count>=cam_num){
        c = camera2;
        cam_count = 0;
    }
    else{
        c = camera;
        cam_count += 1;
    }
    controls.object = c;
}
//animation function
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,c);
}
//Function for responsivenss
function onWindowChange(){
    aspect = container.clientWidth/container.clientHeight;
    fov = container.clientHeight/container.clientWidth;
    model.position.set(0,0,0);
    camera.aspect = aspect;
    camera2.aspect = aspect;
    camera.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
//calling responsive fiunction on window resize
window.addEventListener('resize',onWindowChange);
