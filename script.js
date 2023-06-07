const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 2000;
const CANVAS_HEIGHT = canvas.height = 800;
let parallaxSpeed = 3;

const road = document.getElementById("road")
const fire = document.getElementById("fire")
const smoke1 = document.getElementById("smoke1")
const rocks = document.getElementById("rocks")
const building1 = document.getElementById("building1")
const road1 = document.getElementById("road1")
const smoke2 = document.getElementById("smoke2")
const building2 = document.getElementById("building2")
const bg = document.getElementById("bg")
const firetruck = document.getElementById("firetruck")

let x = 0;
let x2 = 2000


const reach = document.getElementById("reach")
reach.value = parallaxSpeed;
const showparallaxSpeed = document.getElementById("parallaxSpeed")
showparallaxSpeed.innerHTML = parallaxSpeed;
reach.addEventListener("change", function(e){
    parallaxSpeed= e.target.value
    showparallaxSpeed.innerHTML = e.target.value;
}
) 


class Layer {
    constructor(image, speedChanger){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedChanger = speedChanger;
        this.speed = parallaxSpeed * this.speedChanger;
    }
    update(){
        this.speed = parallaxSpeed * this.speedChanger;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const roadLayer = new Layer(road, 5.0);
const fireLayer = new Layer(fire, 2.5);
const smoke1Layer = new Layer(smoke1, 2.5);
const rocksLayer = new Layer(rocks, 2.5);
const building1Layer = new Layer(building1, 2.5);
const smoke2Layer = new Layer(smoke2, 2.5);
const road1Layer = new Layer(road1, 5.0);
const building2Layer = new Layer(building2, 1.5);
const bgLayer = new Layer(bg, 1.5);
const firetruckLayer = new Layer(firetruck, 2.5);

const gameObjects = [bgLayer, building2Layer, smoke2Layer,road1Layer, building1Layer,rocksLayer, smoke1Layer, fireLayer, roadLayer, firetruckLayer]

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })
    
    requestAnimationFrame(animate);
    
}

animate();



