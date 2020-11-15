song1 = "";
song2 = "";
leftWristx = "";
leftWristy = "";
rightWristx = "";
rightWristy = "";

function preload()
{
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}


function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
   
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0);
    {
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftwrist);

        scoreRightwrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightwrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristx + "leftWristy = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + rightWristx + "rightWristy = " + rightWristy);
    }
}

function modelLoaded()
{
  console.log('PoseNet is Initialized');
}

function draw()
{
    image(video , 0 , 0 , 600 , 500);

    fill("ff0000");
    stroke("ff0000");

    song1Status=song1.isplaying();
    song2Status=song2.isplaying();

    if(scoreLeftwrist > 0.2)
 {
    circle(leftWristx, leftWristy, 20);
        song1.stop();

        
    if(song2Status==false)
    {
        song2.play();
        document.getElementById("song").innerHTML="playing Peter Pan"
    }
}  

if(scoreRightwrist > 0.2)
 {
    circle(leftWristx, leftWristy, 20);
        song2.stop();

        
    if(song1Status==false)
    {
        song1.play();
        document.getElementById("song").innerHTML="playing Harry Potter"
    }
}  
    }