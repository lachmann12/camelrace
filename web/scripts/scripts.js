setcamel = 1
var audio = new Audio('sounds/moo.mp3');
var audio2 = new Audio('sounds/whip.mp3');
score = {};
playernames = [];
totalscore = [];

$( document ).ready(function() {
	
	$.get("support.php", {userpoints:"gimme"}, function(data, status){
        playernames = Object.keys(data);
	});
	
    $("#loadCamels").animate({ 
        top: "+=10%",
      }, 200 );
    
    console.log(3);
});

function moveCamel(id){
	$("#u"+id).animate({ 
        left: "-=5%",
      }, 100 );
	score[id] += 1;
	
	$("#s"+id).html(score[id]);
	
	if(Math.random() > 0.8){
		audio.play();
		audio2.play();
	}
	console.log(id);
}

function fillCamels(){
	if(setcamel == 1){
		setcamel = 2;
		for(j=0; j<playernames.length; j++){
			i = playernames[j];
			score[i] = 0;
			
			$("#content").append("<div id='u"+i+"' class='camel'><img class='img' src='images/camel"+((j%9)+2)+".png' /><div id='s"+i+"' class='score'>0</div></div>");
			$("#u"+i).css({right:200,top:j*45+320});
			
			$("#content").append("<button id='b"+i+"' class='movebtn' onclick=\"moveCamel('"+i+"')\">"+i+"</button>");
			$("#b"+i).css({right: 10, top:j*45+340});
			
			$("#loadCamels").fadeOut(500);
			console.log(i);
		}
		$("#content").append("<a href='javascript:save()'><img id='save' src='images/trophy.png'></a>");
	}
}

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function save(){
	console.log("save", score);
	
    var str = JSON.stringify(jscore);
    
    $.get("support.php", {points:str}, function(data, status){
        totalscore = data;
        
        $.get("support.php", {userpoints:"gimme"}, function(data, status){
        	scores = data;
        	playernames = getSortedKeys(data);
        	$("#content").html("");
        	
        	var temp = "<div id='result'><div id='finalscores'><table><tr><td>Name</td><td>Score</td><tr>";
        	
        	temp += "<tr id='winner'><td id='namefield'>"+playernames[0]+"</td><td>"+scores[playernames[0]]+"</td><tr>";
        	for(j=1; j<playernames.length; j++){
        		temp += "<tr><td>"+playernames[j]+"</td><td>"+scores[playernames[j]]+"</td><tr>";
        	}
        	
        	$("#content").append(temp+"</div></div>");
        	
        	$("#results").animate({ 
		        top: "+=10%",
		      }, 200 );
				});
        
	});
}





