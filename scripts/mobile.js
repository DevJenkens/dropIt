//MatterJS setup variables
var Engine = Matter.Engine, Render = Matter.Render, World = Matter.World, Bodies = Matter.Bodies;
var engine, world, ground;
//Initializing variables
var gameManager;
var btnMenu, btnsDrop, shapes, shapesInfo, canPlay, showWaiting, nextShape, score, btnSubmit, btnRestart, scene;
//Before page load
function preload(){
    qr = loadImage("assets/QR.png");
    font = loadFont('assets/commando.ttf');
}
//Page onload
function setup(){
    //Singleton
    gameManager = new Singleton();
    setGlobals();
    //MatterJS
    startPhysics();
    //Firebase
    startListening("mobile",gotScene);
    startListening("canPlay",gotCanPlay);
    startListening("canPlay",gotWaiting);
    startListening("curScore",gotCurScore);
    updateData("mobile",{val:gameManager.scenesMobile[0]});
    //Variables
    btnMenu = new Button(width*0.5,height*0.66,width*0.66,height*0.33,"START",gameManager.palette[2],0)
    shapesInfo = [];
    shapes = [];
    btnsDrop = [];
    canPlay = true;
    showWaiting = false;
    //Buttons
    for(var i=0;i<3;i++){
        btnsDrop[i] = new Button(width/5+(width*0.3*i),height*0.6,width*0.2,width*0.2,"",0,gameManager.palette[2])
    }
    drawButtonShapes();
    score = 0;
    btnSubmit = new Button(width*0.5,height*0.66,width*0.66,height*0.33,"SUBMIT",gameManager.palette[2],0);
    btnRestart = new Button(width*0.5,height*0.66,width*0.66,height*0.33,"RESTART",gameManager.palette[2],0);
}
//Called every frame
function draw(){
    textFont(font);
    //Draw Background
    background(0);
    setPage(scene);
}
//On mouse click
function mousePressed(){
    //Draw Rest of scene
    buttonClick(scene);
}