/**
 * Created by HP on 2017/8/14.
 */
var friendContent=document.getElementById('friendContent');
(function addFriend() {
    var con=[];
    for(var i=0;i<15;i++){
        var _con=friendContent.innerHTML.replace('{{img}}',i);
        con.push(_con);
    }
    friendContent.innerHTML=con.join(' ');
})()


var banner=document.getElementById("banner");
var bannerVideo=document.getElementById("bannerVideo");
var videoBtn=document.getElementById("videoBtn").getElementsByTagName("span");
var width=bannerVideo.scrollWidth/6;
var len=4;
var index=1;
var interval=5000;
var anim=false;    //防止在图片切换的途中点击按钮
function re(){
    bannerVideo.style.left=-document.body.clientWidth+"px"; //获取屏幕宽度
    //videoBtn[index].className="video-dot";
}
re();
function move(n){
    var left=parseInt(bannerVideo.style.left)+n;  //需要移动的距离
    var time=300;  //设置动画时间300ms
    var intrv=10; //隔多久刷新一次
    var speed=n/(time/intrv); //刷新速度
    anim=true;
    function go(){
        if((speed>0&&left>parseInt(bannerVideo.style.left))||(speed<0&&left<parseInt(bannerVideo.style.left))){
            bannerVideo.style.left=parseInt(bannerVideo.style.left)+speed+"px";
            setTimeout(go,intrv); //设置定时器，隔intrv时间执行一次go
        }
        else{
            bannerVideo.style.left=left+"px";
            if(left>-width){
                bannerVideo.style.left=-width*len+"px";
            }
            else if(left<-width*len){
                bannerVideo.style.left=-width+"px";   //判断超过之后回到第一个
            }
            anim=false;
        }
    }
    go();

}
function showbtn(){    //改变按钮样式
    for(var i=0;i<videoBtn.length;i++){
        if(videoBtn[i].className="video-dot active"){
            videoBtn[i].className="video-dot";
        }
    }
    videoBtn[index-1].className="video-dot active";
}
//左滑
function leftnext(){
    if (anim) {
        return;
    }
    index-=1;  //判断点击到了哪个按钮
    if(index<1){
        index=4;
    }
    move(width);
    showbtn();
};
function rightnext(){
    if (anim) {
        return;
    }
    index+=1;
    if(index>4){
        index=1;
    }
    move(-width);
    showbtn();
};

for(var j=0;j<videoBtn.length;j++){   //点击按钮切换图片
    videoBtn[j].onclick=function(){
        if (anim) {
            return;
        }
        if(this.className=="active"){
            return false;
        }

        var myIndex = parseInt(this.getAttribute('index'));
        var offset = -width * (myIndex - index);
        index = myIndex;
        move(offset);
        showbtn();

    }

}

var videos=document.getElementsByTagName('video');
for(var s=0;s<len;s++){
    if(videos[s].ended){
            play();
        }
}

//点击播放
var playVideo=0;
function videoplay(ele){
    var n=ele.id.split('_')[1];
    var videon=document.getElementById('video'+n);
    
    banner.onclick=function(){
        if(/icon-pauseround/.test(ele.className)){
            if(videon.ended){
                ele.className=ele.className.replace(/icon-pauseround/,'icon-playround');
                ele.style.visibility='visible';
            }
            else{
                ele.style.visibility='visible';
                timer2 = setTimeout(function(){
                     ele.style.visibility='hidden';
                },2000);
            }
             
        }else{
            ele.style.visibility='visible';
        }
    }
    
    if(playVideo==0){
        ele.className=ele.className.replace(/icon-playround/,'icon-pauseround');
        videon.play();
        playVideo=1;
        timer1 = setTimeout(function(){
            ele.style.visibility='hidden';
        },1000);
        stop();
        
    }else{
        ele.className=ele.className.replace(/icon-pauseround/,'icon-playround');
        playVideo=0;
        videon.pause();
        
    }
    
}

function play() {    //设置自动播放
    timer = setTimeout(function () {
        rightnext();
        play();
    }, interval);
}
function stop() {
    clearTimeout(timer);
}
banner.onmouseover=stop;  //鼠标移入停止自动播放
banner.onmouseout=play;
play();

//右边导航
// window.onscroll = function(){
//     if((document.body.scrollTop>260)||(document.documentElement.scrollTop>260)){
//         document.getElementById("asideNav").style.visibility="visible";
//     }
//     else{
//         document.getElementById("asideNav").style.visibility="hidden";
//     }
// }
