function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
video = createCapture(VIDEO)
video.size(380, 380);
video.hide();
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

var img = "";
var status = "";
var object = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function modalLoaded() {
    console.log("Model Loaded!!!!")
    status = true;
    
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResults);

        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_object").innerHTML = "Number Of Object detected are : "+ object.length;
            
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

   






}