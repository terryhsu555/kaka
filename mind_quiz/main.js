$(document).ready(function(){
    let currrentQuiz=null;
    $("#startButton").click(function(){
        if(currrentQuiz==null){
            currrentQuiz=0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            for(let x=0;x<questions[0].answers.length;x++){
                $("#options").append(
                      "<input name='options' type='radio' value="+
                      x+
                     "<label>"+questions[0].answers[x][0]+
                      "</label><br><br>"
                );
            }
            $("#startButton").attr("value","Next");
        }
        else{
            $.each(
                $(":radio"),function(i,val){
                    if(val.checked){
                        if(isNaN(questions[currrentQuiz].answers[i][1])){
                            let finalResult=questions[currrentQuiz].answers[i][1];
                            $("#question").text(finalAnswers[finalResult][0]);
                            $("#options").empty();
                            $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                            currrentQuiz=null;
                            $("#startButton").attr("value","Restart");
                        }
                        else{
                            currrentQuiz=questions[currrentQuiz].answers[i][1]-1;
                            $("#question").text(questions[currrentQuiz].question);
                            $("#options").empty();
                            for(let x=0;x<questions[currrentQuiz].answers.length;x++){
                                $("#options").append(
                                      "<input name='options' type='radio' value="+
                                      x+
                                     "<label>"+questions[currrentQuiz].answers[x][0]+
                                      "</label><br><br>"
                                );
                            }
                        }
                        return false;
                    }
                }
            );
        }
    });
});