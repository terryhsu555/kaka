$(document).ready(function(){
    
    let currentQuiz = 0;
    $("#startButton").click(function(){
        if(!currentQuiz)
        {
            $("#question").text((currentQuiz+1)+'. '+questions[currentQuiz]);

            $("#options").empty();
            
            $("#options").append(
                 "<input type='range' min='1' max='5' step='1' value='3'><br><br><labal>"
                 + $("[type=range]").val() + "</labal><br><br>"
            );

            $("LABAL").text($("[type=range]").val() + fiveIndex[$("[type=range]").val() - 1]);

            $("[type=range]").change(function()
            {
                $("LABAL").text($("[type=range]").val() + fiveIndex[$("[type=range]").val() - 1]);
            });

            currentQuiz++;
            $("#startButton").attr("value","Next");
        }

        else if(currentQuiz < 30){

            answers[(currentQuiz - 1)] = parseInt($("[type=range]").val());

            $("#question").text((currentQuiz+1)+'. '+questions[currentQuiz]);
        
            $("[type=range]").change(function()
            {
                $("LABAL").text($("[type=range]").val() + fiveIndex[$("[type=range]").val() - 1]);
            });

            currentQuiz++;
        }

        else{

            answers[(currentQuiz - 1)] = parseInt($("[type=range]").val());

            let allScores=[
                {"Char":"老虎", "Score":answers[4]+answers[9]+answers[13]+answers[17]+answers[23]+answers[29]},
                {"Char":"孔雀", "Score":answers[2]+answers[5]+answers[12]+answers[19]+answers[21]+answers[28]},
                {"Char":"無尾熊", "Score":answers[1]+answers[7]+answers[14]+answers[16]+answers[24]+answers[27]},
                {"Char":"貓頭鷹", "Score":answers[0]+answers[6]+answers[10]+answers[15]+answers[20]+answers[25]},
                {"Char":"變色龍", "Score":answers[3]+answers[8]+answers[11]+answers[18]+answers[22]+answers[26]}
              ];

            $("#options").empty();
            $("#question").empty();

            allScores.sort(function(a,b){
                return b.Score-a.Score;
            });

            for(let i = 0;i < allScores.length;++i){
                $("#options").append("<labal>"+allScores[i].Char + ':' + allScores[i].Score +"</labal><br>");
            }

            $("#options").append("<br>")

            $("#startButton").attr("value","Restart");
            currentQuiz = 0;
        }
    });
});
