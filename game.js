var buttoncolors = ["red","blue","green","yellow"];

var gamepattern =[];

var userclickedpattern =[];


var started = false;
var level = 0;

$(document).on("keypress",function(){
    if (!started) {
        
        $("#level-title").text("Level "+level);
        nextsequence();
        started = true;
    }
});



$(".btn").on("click", function(){

    var userchosencolor = $(this).attr("id");
    
    userclickedpattern.push(userchosencolor);

    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userclickedpattern.length-1);

});


function checkanswer(currentlevel){

    if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {
        if (userclickedpattern.length === gamepattern.length){

            setTimeout(function(){
                nextsequence();
            }, 1000);
        }
    }

    else {
        playsound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startover();
    }
}


function nextsequence() {

    userclickedpattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomnumber = Math.floor((Math.random() * 4)) ;
    var randomchosencolor = buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);

    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomchosencolor);
    
}


function playsound(name){

    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play();

}


function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentcolor).removeClass("pressed");
    }, 100);
}

function startover(){
    level = 0;
    gamepattern = [];
    started = false;

}