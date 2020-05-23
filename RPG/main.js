let mapArray, ctx, currentImgMainX, currentImgMainY;
let imgMountain, imgMain, imgEnemy;

$(document).ready(function () {
    //0可走 1障礙 2終點 3敵人
    mapArray = [0, 1, 1, 0, 0, 0, 3, 1, 2];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "RPG/image/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;

    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);
    }

    imgMountain = new Image();
    imgMountain.src = "RPG/image/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "RPG/image/Enemy.png";

    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (let x in mapArray) {
                if (mapArray[x] == 1) {
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
                }
                else if (mapArray[x] == 3) {
                    ctx.drawImage(imgEnemy, 7, 40, 104, 135, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
                }
            }
        }
    }
});

$(document).keydown(function (event) {
    let targetImageinX, targetImageinY, targetBlock, cutImagePositionX;

    event.preventDefault();

    switch (event.originalEvent.code) {
        case "ArrowLeft":
            targetImageinX = currentImgMainX - 200;
            targetImageinY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case "ArrowRight":
            targetImageinX = currentImgMainX + 200;
            targetImageinY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case "ArrowUp":
            targetImageinX = currentImgMainX;
            targetImageinY = currentImgMainY - 200;
            cutImagePositionX = 355;
            break;
        case "ArrowDown":
            targetImageinX = currentImgMainX;
            targetImageinY = currentImgMainY + 200;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if (targetImageinX <= 400 && targetImageinX >= 0 &&
        targetImageinY <= 400 && targetImageinY >= 0)
        targetBlock = targetImageinX / 200 + targetImageinY / 200 * 3;
    else
        targetBlock = -1;

    ctx.clearRect(currentImgMainX, currentImgMainY, 200, 200);

    if (targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3);
    else {
        $("#talkbox").empty();
        currentImgMainX = targetImageinX;
        currentImgMainY = targetImageinY;
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);


    switch (mapArray[targetBlock]) {
        case undefined:
            $("#talkbox").text("邊界");
            break;
        case 1:
            $("#talkbox").text("有山");
            break;
        case 2:
            $("#talkbox").text("抵達終點");
            break;
        case 3:
            $("#talkbox").text("哈囉");
            break;
    }
});