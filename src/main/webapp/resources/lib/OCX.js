//---------------config  ----------------------------
//------------------定义播放器文件的后缀  ----------------------------
Suffix = ".al";
//ftp://thinkit-rw:thinkit-rw@124.16.130.177/YYXT/_testftp/DEVPHONE2.wav
//Prefix = "ftp://thinkit:TBNR$0987@192.168.14.151/";

Prefix = "ftp://ThinkitTest:Asdf123@192.168.14.151/";

//-----------------定义弹出框的大小 ----------------------------
POPWeight = 950;
POPHeight = 700;

//SencePopWeight =900;
//SencePOPHeight = 1000;

SencePopWeight = $(window).width();
SencePOPHeight = $(window).height();


InitSencePopWeight = $(window).width() * 0.65;
InitSencePOPHeight = $(window).height() * 0.7;

//-----------------定义播放器的大小 ----------------------------
AudioHeight = 160;
AudioWeight = 700;


//---------------------主题-----------------------------------------------
Theme = "energyblue";

function PlayAudio()//播放
{
    var AudioOCX = document.getElementById("AudioOCX");
    AudioOCX.PlayAudio();
//				timer1 = setTimeout("timedCount()",1000);
}
function PauseAudio()//暂停
{
    var AudioOCX = document.getElementById("AudioOCX");
    AudioOCX.PauseAudio();
//				timer1 = setTimeout("timedCount()",1000);
}

function StopAudio()//停止
{
    var AudioOCX = document.getElementById("AudioOCX");
    AudioOCX.StopAudio();
//				timer1 = setTimeout("timedCount()",1000);
}

function ZoomIn()//放大波形
{
    var AudioOCX = document.getElementById("AudioOCX");
    AudioOCX.ZoomIn();
//				timer1 = setTimeout("timedCount()",1000);
}

function ZoomOut()//缩小波形
{
    var AudioOCX = document.getElementById("AudioOCX");
    AudioOCX.ZoomOut();
//				timer1 = setTimeout("timedCount()",1000);
}

/**
 *
 * @param {type} starttime  开始时间
 * @param {type} endtime  结束时间
 * @returns {undefined}
 */
function showSegment(starttime, endtime) {
//    alert("enter the method'");
    var AudioOCX = document.getElementById("AudioOCX");
    var st = parseFloat(starttime);
//    alert(st*1000);
    var et = parseFloat(endtime);
    var duration = et - st;
    AudioOCX.SelectSegment(st * 1000, duration * 1000);
    AudioOCX.ViewRegion();
}


function playPart(starttime, endtime) {
//    alert("enter the method'");
    var AudioOCX = document.getElementById("AudioOCX");
    var st = parseFloat(starttime);
//    alert(st*1000);
    var et = parseFloat(endtime);
    var duration = et - st;
    AudioOCX.PlayPart(st * 1000, duration * 1000);
//            .SelectSegment(st*1000, duration*1000);
//    AudioOCX.ViewRegion();
}

/**
 * 播放关键词函数，为其播放前后添加半秒的缓冲
 * @param {type} starttime
 * @param {type} endtime
 * @returns {undefined}
 */
function playKeywordPart(starttime, endtime) {
//    alert("enter the method'");
    var AudioOCX = document.getElementById("AudioOCX");
    var st = parseFloat(starttime);
//    alert(st*1000);
    var et = parseFloat(endtime);

    var initSt = st - 0.5;
    var initet = et + 0.5;
    var duration = initet - initSt;

    AudioOCX.PlayPart(initSt * 1000, duration * 1000);
//            .SelectSegment(st*1000, duration*1000);
//    AudioOCX.ViewRegion();
}