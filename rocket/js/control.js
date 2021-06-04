/**
 * Created by maayanlab on 9/16/16.
 */
$(document).ready(function(){

    Dropzone.autoDiscover = false;

    Dropzone.options.drop = {
        method: 'post',
        paramName: 'file',
        parallelUploads: 1,
        dictDefaultMessage: "Drag fastq/fastq.gz files here for upload. Only fastq/fastq.gz files supported at this point.",
        clickable: true,
        enqueueForUpload: true,
        maxFilesize: 6000000,
        uploadMultiple: false,
        addRemoveLinks: false,
        acceptedFiles: ".fastq,.fastq.gz",

        init: function() {
            this.on("addedfile", function(file) {
                alert("cool");
                this.emit("thumbnail", file, "images/dna.png");
            }),
            this.on("sending", function(form, xhr) {
                console.log($("#drop").html());
                upload();
            }),
            this.on("complete", function(file, response) {
                this.removeFile(file);
                alert("upload complete");
            })
        }
    }

    $('#drop').dropzone();

});



function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function save(){
    
    jscore = {}
    
    for(i=0; i< players.length; i++){
        jscore[players[i]] = score[i];
    }
    
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

