class Singleton{
    constructor () {
        //Check if the instance exists or is null
        if (!gameManager) {
            //If null, set gameManager to this Class 
            gameManager = this;
        } else {
            console.log("Singleton Already Exists");
        }
        this.palette = ["#009199","#ff6Ad5","#c774e8"];
        this.scenesDesktop = ["desktopMenu","desktopGame","desktopHighscores","desktopRestart"];
        this.scenesMobile = ["mobileMenu","mobileDrop","mobileSubmit","mobileRestart"];
        this.shapeTypes = ["Square","Rectangle","Circle","Triangle","Pentagon"];
    //Returns itself
        return gameManager;
    }
}