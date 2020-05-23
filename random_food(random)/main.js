/*
window.onload=function(){
    document.write("Hello Js");
}*/

$(document).ready(function(){
    $("input").click(function(){
       
        let numOfListItem = $("#choices li").length;
        let randomnum = Math.floor(Math.random()*numOfListItem);
        $("#random_result").text($("#choices li").eq(randomnum).text());
        $("#random_food").attr("src","random_food(random)/"+randomnum+".jpg");
    });
});