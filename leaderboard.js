$(function(){
    $.post("populateLeaderboard.php", function(data){
        if(data == 'error'){
            $('#leaderboard').html("uh oh");
        }
        else{
            $('#leaderboard').html(data);
        }
    });
});