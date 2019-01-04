//Setup
//Set varaibles
function setGlobals(){
    //Set Screen
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    ellipseMode(RADIUS);
    pixelDensity(0.6);
    strokeWeight(3);
    //Start Firebase
    startFirebase();
}
//Set background
function setBackground(){
    starPos = [];
    createStars(starPos,50);
    lines = [];
    intervalLines = window.setInterval(createLines, 650);
}
//Create star positions
function createStars(array,num){
    for(var i=0;i<num;i++){
        array.push([round(random(0,width)),round(random(0,height/2))]);
    }
}
//Create moving grid lines
function createLines(x) {
    if ( document.hasFocus() ) {
        lines.push(new Line(height/2));
    }
}
//MATTER.JS
function startPhysics(){
    engine = Engine.create({enableSleeping: true});
    world = engine.world;
    ground = Bodies.rectangle(width*0.5,height*0.85,width*0.5,25, {isStatic: true});
    World.add(world, ground);
    Engine.run(engine);
}
//FIREBASE
function startFirebase(){
    var config = {
        apiKey: "AIzaSyCXCxMhATCQKbOuH5esE9rE7BIDciyHmRQ",
        authDomain: "rmp-test-90920.firebaseapp.com",
        databaseURL: "https://rmp-test-90920.firebaseio.com",
        projectId: "rmp-test-90920",
        storageBucket: "rmp-test-90920.appspot.com",
        messagingSenderId: "1068237665337"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}
//VIEW - DOM Manipulation
//Draw background
function drawBackground(){
    stroke(gameManager.palette[0]);
    //Vertical Lines
    for(var i = 0; i < 20; i++){
        line((width/2)+i*width*0.05,height/2,(width/2)+i*width*0.1,height);
        line((width/2)-i*width*0.05,height/2,(width/2)-i*width*0.1,height)
    }
    line(0,height/2,width,height/2)
    //Show Horizontal Lines
    for(var i=lines.length-1;i>=0;i--){
        lines[i].show();
        if(lines[i].x>height){
            lines.splice(i,1);
        }
    }
    //Show Stars
    for(var i=0;i<starPos.length;i++){
        ellipse(starPos[i][0],starPos[i][1],1,1);
    }
}
//Draw title
function drawTitle(name,h=height*0.25,size=1,col=gameManager.palette[1]){
    noStroke();
    fill(col);
    textSize((height*0.2)*size);
    text(name, width*0.5, h);
}
//Draw ground
function drawBox(x,y,w,h){
    fill(0); 
    stroke(gameManager.palette[2]); 
    rect(x,y,w,h);
}
//Draws moving target
function drawTarget(){
    stroke(gameManager.palette[1]);
    line(target-10,0,target,50);
    line(target+10,0,target,50);
    target += dir * 3
    if(target > width*(0.5+0.25)){
        dir = -1;
        target = width*(0.5+0.25);
    }else if(target < width*(0.5-0.25)){
        dir = 1;
        target = width*(0.5-0.25);
    }
}
//Displays shapes on screen
function drawShapes(){
    for(var i=0; i<shapes.length; i++){
        shapes[i].show();
    }
}
//Draw Hightscores
function drawHighscores(){
    drawTitle("HIGHSCORES",height*0.25,0.75)
    for(var i=0;i<highscores.length;i++){
        drawTitle(i+1 + " : " + highscores[i][1],height*0.4+i*height*0.066,0.33)
    }
    
}
//Draw shapes on buttons
function drawButtonShapes(){
    for(var i=0;i<3;i++){
        shapesInfo[i] = pickShape();
        shapes[i] = createShape(shapesInfo[i], btnsDrop[i].x, height*0.6, 2, true);
        shapes[i].body.sleepThreshold = 0;

    }
}
//Draw menu
function drawMenu(){
    if(canPlay && !showWaiting){
        drawTitle("Pick a Shape",height*0.2,0.66);
        for(var i=0;i<btnsDrop.length;i++){
            btnsDrop[i].show();    
            shapes[i].show();
        }
    }else{
        drawTitle("Please Wait",height*0.2,0.66);
    }
}
//Display scene
function setPage(scene){
    switch(scene){
        case "desktopMenu": 
            //Draw UI
            drawTitle("DROP IT");
            drawTitle("Scan the QR code below on your phone to get started",height*0.4,0.25);
            image(qr, (width/2)-width/12, height*0.66, width/6, width/6); 
            break;
        case "desktopGame": 
            //Draw UI
            drawBox(width*0.5,height*0.905,175,50);
            drawTitle(score, height*0.91,0.25);
            drawTarget();
            //Draw shapes
            drawBox(width*0.5,height*0.85,width*0.5,25);
            drawShapes();
            //Check States
            checkBlocks();
            lost();
            updateCanPlay();
            break;
        case "desktopHighscores": 
            //Draw UI
            drawHighscores();
            updateData("mobile",{val:gameManager.scenesMobile[3]});
            break;
        case "desktopRestart": 
            location.reload();
            break;
        case "mobileMenu": 
            //Draw UI
            drawTitle("DROP IT",height*0.2,0.66);
            btnMenu.show();    
            break;
        case "mobileDrop": 
            //Draw Background
            background(0);
            //Draw UI
            drawMenu();
            break;
        case "mobileSubmit": 
            //Draw UI
            drawTitle("Score : " + score,height*0.2,0.66); 
            btnSubmit.show();   
            break;
        case "mobileRestart": 
            //Draw UI
            drawTitle("DROP IT",height*0.2,0.66);
            btnRestart.show();   
            break;
    }
}
//Handle button clicks
function buttonClick(scene){
    switch(scene){
        case "mobileMenu": 
            if(mouseX > btnMenu.x-btnMenu.w/2 && mouseX < btnMenu.x+btnMenu.w/2 && mouseY > btnMenu.y-btnMenu.h/2 && mouseY < btnMenu.y+btnMenu.h/2){
                updateData("desktop",{val:gameManager.scenesDesktop[1]});
                updateData("mobile",{val:gameManager.scenesMobile[1]});
            }
            break;
        case "mobileDrop": 
            for(var i=0;i<btnsDrop.length;i++){
                if(mouseX > btnsDrop[i].x-btnsDrop[i].w/2 && mouseX < btnsDrop[i].x+btnsDrop[i].w/2 && mouseY > btnsDrop[i].y-btnsDrop[i].h/2 && mouseY < btnsDrop[i].y+btnsDrop[i].h/2){
                    updateData("nextShape",{val:shapesInfo[i]});
                    updateData("drop",{val:round(random(0,1000))});
                    showWaiting = true;
                    drawButtonShapes();
                }
            }
            break;
        case "mobileSubmit": 
            if(mouseX > btnSubmit.x-btnSubmit.w/2 && mouseX < btnSubmit.x+btnSubmit.w/2 && mouseY > btnSubmit.y-btnSubmit.h/2 && mouseY < btnSubmit.y+btnSubmit.h/2){
                pushData("scores",{name: "NAME", score: score})
                updateData("desktop",{val:gameManager.scenesDesktop[2]});
            }  
            break;
        case "mobileRestart": 
            if(mouseX > btnRestart.x-btnRestart.w/2 && mouseX < btnRestart.x+btnRestart.w/2 && mouseY > btnRestart.y-btnRestart.h/2 && mouseY < btnRestart.y+btnRestart.h/2){
                updateData("desktop",{val:gameManager.scenesDesktop[3]});
                location.reload();
            }  
            break;
    }
}
//PRESENTER - EVENT HANDLING
//Create shape from selected shape
function createShape(shape, x=target,y=height*0.1, size=1, static=false){
    switch(shape) {
        case "Square":
            return new Box(x,y,size*width*0.05,size*width*0.05,{isStatic: static,friction: 1,restitution: 0.5});
        case "Rectangle":
            return new Box(x,y,size*width*0.066,size*width*0.033,{isStatic: static,friction: 0.5,restitution: 0});
        case "Circle":
            return new Circle(x,y,size*width*0.025,{isStatic: static,friction: 1,restitution: 0.25});
        case "Triangle":
            return new Triangle(x,y,size*width*0.033,3,{isStatic: static,angle: 1.57,friction: 1,restitution: 0, density: 0.005});
        case "Pentagon":
            return new Triangle(x,y,size*width*0.033,5,{isStatic: static,angle: 1.57,friction: 1,restitution: 0, density: 0.0005});
    }
}
//Pick next shape
function pickShape(){
    return gameManager.shapeTypes[round(random(0,gameManager.shapeTypes.length-1))];
}
//creates shape and picks next shape
function handleShape(){
    shapes.push(createShape(nextShape));
}
//Check if blocks are not moving
function checkBlocks(){
    for(var i=0; i<shapes.length; i++){
        if(!shapes[i].body.isSleeping){
            return false;
        }
    }
    if (!canPlay){
        updateScore();
        return true;
    }
}
//Check if block fell over edge
function lost(){
    for(var i=0; i<shapes.length; i++){
        if(shapes[i].body.position.y > height*2){
            drawTitle("GAME OVER",height*0.3);
            updateData("mobile",{val:gameManager.scenesMobile[2]});
        }
    }
}
//Check if player can play
function updateCanPlay(){
    if(canPlay && checkBlocks() == false){
        updateData("canPlay",{val:false});
    }else if(!canPlay && checkBlocks() == true){
        updateData("canPlay",{val:true});
    }
}
//Update Score
function updateScore(){
    var curScore = shapes.length*10;
    if(curScore != score){
        score = curScore;
        updateData("curScore",{val:score});
    }
}
//Drawing polygon function
function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
//SERVER COMMUINCATION - CONTROLLER
//Start listening for database updates
function startListening(reference,gotData){
    database.ref(reference).on("value", gotData, errData);
}
//Push new data to the database
function pushData(reference,data){
    database.ref(reference).push(data);
}
//Update existing data on the database
function updateData(reference,data){
    database.ref(reference).update(data);
}
//Error handling
function errData(err){
    console.log("Error");
    console.log(err);
}
//If drop gets updated on the database
function gotDrop(data){
    if(canPlay == true){
        handleShape();
    }
}
//If nextShape gets updated on the database
function gotNextShape(data){
    nextShape = data.val().val;
}
//If drop curScore updated on the database
function gotCurScore(data){
    score = data.val().val;
}
//If canPlay gets updated on the database
function gotCanPlay(data){
    canPlay = data.val().val;
}
//If canPlay gets updated on the database update waiting
function gotWaiting(data){
    showWaiting = false;
}
//If scene gets updated on the database
function gotScene(data){
    scene = data.val().val;
}
//Getting the scores from the database
function gotScores(data){
    var keys = Object.keys(data.val());
    for(var i=0;i<keys.length;i++){
        highscores[i] = [data.val()[keys[i]].name,data.val()[keys[i]].score];
    }
    highscores.sort(function(a, b){return b[1]-a[1]});
    highscores.splice(9,highscores.length-9);
}
