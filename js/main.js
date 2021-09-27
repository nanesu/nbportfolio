'use strict'

let can = document.getElementById('can');
let ctx = can.getContext('2d');
can.width= window.innerWidth;
can.height = window.innerHeight;

window.requestAnimationFrame = window.requestAnimationFrame || 
                           window.mozRequestAnimationFrame ||
                           window.webkitRequestAnimationFrame ||
                           window.msRequestAnimstionFrame ||
                           function(callback){ setTimeout(callback,17); };


//乱数用
function rand(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}


//マウスの検知
const mouse ={
  x: null,
  y: null,
  radius:5,
}

window.addEventListener('mousemove' , (e)=>{
  mouse.x = e.x;
  mouse.y = e.y;


});


  class Babble{
    constructor(x, y, radius, vx, vy){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.vx = vx;
      this.vy = vy;
      this.big = 1;
      this.kill = false;
      this.color = colors[0];
    }
    render(){
      // 円をかく
      ctx.beginPath();
      ctx.globalAlpha= 0.1;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      // ctx.fillStyle = 'gray';
      // ctx.fill();

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;
      ctx.stroke()

    }
    update(){
     this.radius += (this.big)/2;
     
     if(this.radius <= 60){
      this.color = colors[1];
      this.render();
     }else if(this.radius <= 90){
      this.color = colors[2];
      this.render();
     }else{
       this.kill = true;
     }

     if(detectCollision(mouse.x, mouse.y, mouse.radius,  this.x, this.y, this.radius ) && this.kill != true){
       
       ctx.fillStyle = grad;
       ctx.fill();
       
      //  ctx.strokeStyle = "transparent";
      //  ctx.stroke();
      grad = ctx.createRadialGradient(this.x , this.y , 20 , this.x , this.y , this.radius );
      grad.addColorStop(0.0 , "rgba(27,0,36,0.2903536414565826)");
      grad.addColorStop(1.0 , "rgba(196,115,235,1)");
      grad.addColorStop(0.5 , "rgba(4,165,198,1)");
     }

//スマホサイズ４８０以下ならパーティクルサイズを小さくする
     if(can.width<=480){
      BABBLE_NUMBER = 4;
    }else {
      BABBLE_NUMBER = 8;
    }









     if(this.kill){
      this.x = rand( 0, can.width );
      this.y = rand( 0, can.height );
      this.radius = rand(5, 30);
      this.vx = rand(1, 3);
      this.vy = rand(1, 3);
      this.kill = false;
     }
     
        
     
      
    
    }
  }


let babbles = [];
let BABBLE_NUMBER = 6;

function drawBabble(){
  for(let i=0; i<BABBLE_NUMBER; i++){
    let x = rand( 0, can.width );
    let y = rand( 0, can.height );
    let radius = rand(1, 30);
    let vx = rand(1, 3);
    let vy = rand(1, 3);
    let babble = new Babble(x, y, radius, vx, vy);
    babbles.push(babble);
  }
}


//色のバリエーション
let colors =[
    "black",
    "gray",
    "blue" ,
    "pink" ,

];


//円の衝突判定
function detectCollision (x1,y1,r1,x2,y2,r2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < r1+r2;
}




drawBabble();
AnimationLoop();

                           

//アニメーションのループ
function AnimationLoop(){
  can.width= window.innerWidth;
  can.height = window.innerHeight;

 

  ctx.clearRect(0,0,can.width,can.height);

  for(let i=0; i<babbles.length; i++){
  babbles[i].update();
  }

  requestAnimationFrame(AnimationLoop);

}   




//ホバー時の円のグラデーション用
let  grad=[];





// 着火アニメーション
// オプションを指定する。
const options = {
  root: document.querySelector('.root'),
  rootMargin: '5%',
  threshold: [0.8, 1.0]
}

// オプションとともにIntersectionObserverオブジェクトを作成する。
const observer = new IntersectionObserver((entries) => {
  for(const e of entries) {
    // console.log(e);
    if (e.intersectionRatio ===1 ) {
      startGraph();
     
    } 
  }
}, options);

// 監視したい要素をobserveする。
observer.observe(document.querySelector('.label'));

let bar =document.getElementsByClassName("bar");
function startGraph() {
  bar[0].style.animationPlayState = "running";
  bar[1].style.animationPlayState = "running";
  bar[2].style.animationPlayState = "running";
  bar[3].style.animationPlayState = "running";
  bar[4].style.animationPlayState = "running";
  bar[5].style.animationPlayState = "running";
  bar[6].style.animationPlayState = "running";
  bar[7].style.animationPlayState = "running";
}



window.addEventListener('DOMContentLoaded', function(){
  window.addEventListener('resize', function(){
    // console.log("Width:" + window.innerWidth);
    // console.log("Height:" + window.innerHeight);
  });
});