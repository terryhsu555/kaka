var player; // Youtube 撥放器
var currentPlay = 0; //紀錄現在第幾首

function onYouTubeIframeAPIReady() //when youtube api ready
{
    player = new YT.Player("player",
    {
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{
            "autoplay":0,
            "controls":0,
            "start":playTime[currentPlay][0],
            "end":playTime[currentPlay][1],
            "showinfo":0,
            "rel":0,
            "iv_load_policy":3 //不顯示影片註解
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}

function onPlayerReady(event) //when youtube player ready
{
    $("#playButton").click(function(){
        $("#text").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event) //when youtube player state change
{
    if(Math.floor(player.getCurrentTime()) == playTime[currentPlay][1])
    {
        if(currentPlay < playList.length - 1)
        {
            currentPlay++;
            player.loadVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }
        else
        {
            currentPlay = 0;
            player.cueVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
            $("#text").empty();
        }
    }
    if(player.getVideoLoadedFraction()>0)
    {
        $("#text").text(player.getVideoData().title);
    }
}