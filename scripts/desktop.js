//MatterJS setup variables
var Engine = Matter.Engine, Render = Matter.Render, World = Matter.World, Bodies = Matter.Bodies;
var engine, world, ground;
//Initializing variables
var gameManager, starPos, lines;
var qr, shapes, target, dir, canPlay, nextShape, score, highscores, scene;
//Before page load
function preload(){
    qr = loadImage("assets/QR.png");
}
//Page onload
function setup(){
    //Setting up the canvas
    gameManager = new Singleton();
    setGlobals();
    setBackground();
    //MatterJS
    startPhysics();
    //Firebase
    startListening("desktop",gotScene);
    startListening("scores",gotScores);
    startListening("drop",gotDrop);
    startListening("nextShape",gotNextShape);
    startListening("canPlay",gotCanPlay);
    updateData("canPlay",{val:true});
    updateData("desktop",{val:gameManager.scenesDesktop[0]});
    updateData("mobile",{val:gameManager.scenesMobile[0]});
    //Variables
    shapes = [];
    score = 0;
    target = width/2;
    dir = 1;
    canPlay = false;
    nextShape = pickShape();
    highscores = [];
}
//Called every frame
function draw(){
    //Draw Background
    background(0);
    drawBackground();
    //Draw Rest of scene
    setPage(scene)
}