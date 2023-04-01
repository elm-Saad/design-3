//==> handle the nav click 
const megaMenu = document.querySelector('.header .main-nav li.menu a');
const menuHolder = document.getElementById('mega-menu');
megaMenu.addEventListener('click',()=>{
    menuHolder.classList.toggle('on');
});
document.addEventListener("click",(e)=>{// close nav for any ohter click
    if(e.target !== megaMenu){ 
       if(menuHolder.classList.contains('on')){ // check if nav open 
            menuHolder.classList.remove('on');
       }
    }
});
menuHolder.onclick = function(e){//stop propagation on the menu 
    e.stopPropagation();
}

//==> Read more handle 
const readMore = document.querySelectorAll('.box .info .read-more-btn');
const moreText = document.querySelectorAll('.article .box .more');
readMore.forEach(ele =>{
    ele.addEventListener("click",()=>{
        if( ele.innerText == 'Read less' ){//ON => OFF
            moreText[ele.dataset.index].style.left='150%';
            ele.innerText='Read more';
        }else{//OFF => ON
            moreText[ele.dataset.index].style.left='50%';
            ele.innerText='Read less';
        }
    });
});



// ==> popUp  box 
let Details = document.querySelectorAll('.services .Details');
let svgs =document.querySelectorAll('.services .box img');
let gallery = document.querySelectorAll('.gallery .box img');
Details.forEach(ele => {
   popupfn(ele,1)
});
gallery.forEach(ele => {
    popupfn(ele,2)
});

function popupfn(ele,x){

    ele.addEventListener('click', (e) =>{
        let Overlay = document.createElement("div"); 
        Overlay.className ='popup-overlay';
        document.body.appendChild(Overlay);

        let popupBox = document.createElement("div");
        popupBox.className ='popup-box';

        let popupImage = document.createElement('img');
        if(x==1){
            popupImage.className ='popup-img';
            popupImage.src =svgs[ele.dataset.index].src;
        }else{
            popupImage.className ='popup-img-1';
            popupImage.src =ele.src; 
        }
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let closeBtn = document.createElement("span");
        let closeBtnImg = document.createElement("img");
        closeBtnImg.src='images/exit.svg';
        closeBtn.appendChild(closeBtnImg);
        closeBtn.className = 'close-btn';
        closeBtnImg.className ='ON';
        popupBox.appendChild(closeBtn);

       if(x==1){
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(svgs[ele.dataset.index].alt); 
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);

            let spanHolder =document.createElement('p');
            spanHolder.className ='lines';
            for(let i=0 ;i<7;i++){
                let spanele =document.createElement('span');
                spanHolder.appendChild(spanele);
            }
            popupBox.appendChild(spanHolder);
       } 
    });

}
document.addEventListener("click", (e)=>{//close popup 
    if(e.target.className =='close-btn' || e.target.className =='ON'){
        document.querySelector('.popup-box').remove();
        document.querySelector(".popup-overlay").remove();
    }
});

// ==> Countdown Timer 
let countDown =new Date("Dec 31, 2023 23:59:59").getTime();
let counter = setInterval(()=>{
    
    let dateNow =new Date().getTime();    
    let datediff =countDown - dateNow;

    let days = Math.floor(datediff / 1000 /60 / 60 /24);
    let hours = Math.floor( (datediff % (1000 * 60 * 60 * 24)) / 1000 / 60 / 60);
    let minutes = Math.floor( (datediff % (1000 * 60 * 60 )) / 1000 / 60 );
    let seconds = Math.floor( (datediff % (1000 * 60 )) / 1000 );

    document.querySelector(".event .unit .days").innerText=days < 10 ?`0${days}`:days;
    document.querySelector(".event .unit .hours").innerText=hours < 10 ?`0${hours}`:hours;
    document.querySelector(".event .unit .minutes").innerText=minutes < 10 ?`0${minutes}`:minutes;
    document.querySelector(".event .unit .seconds").innerText=seconds < 10 ?`0${seconds}`:seconds;

    if( datediff <= 0){
        clearInterval(counter);
    }
},1000);

// ==> on scroll
let skillSection =document.querySelector(".our-skills");
let spans = document.querySelectorAll(".our-skills .skills .the-progress span");
let number=document.querySelectorAll('.stats .box .number');
let statsSection =document.querySelector('.stats');
let started=false;
window.onscroll = ()=> {
    // ==> increase number on scroll
    if(window.scrollY >= statsSection.offsetTop - 300){
       
        if(!started){
            number.forEach((num)=>startCount(num));
        }
        started=true;
    }
    // ==> animate on scroll
    if( window.scrollY >= skillSection.offsetTop ){
        spans.forEach(ele =>{
            ele.style.width = ele.dataset.width;
        });
    }
};
function startCount(el){
    let finalnum = el.dataset.num;
    let count =setInterval(()=>{
        el.textContent++;
        if(el.textContent == finalnum){
            clearInterval(count);
        }
    }, 2000 / finalnum );
}

//=> video slider 
const liBtns=document.querySelectorAll(".video .holder .list ul li");
const slides=document.querySelectorAll(".preview .video-slider");
const info  =document.querySelectorAll(".preview .info");
let slidernav =(i)=>{
    liBtns.forEach((btn)=>{
        btn.classList.remove('active')
    });
    slides.forEach((slide)=>{
        slide.classList.remove('active')
    });
    info.forEach((content)=>{
        content.classList.remove('active')
    });

    liBtns[i].classList.add("active");
    slides[i].classList.add("active");
    info[i].classList.add("active");
}
liBtns.forEach((btn, i)=>{
    btn.addEventListener("click",()=>{
        slidernav(i);
    });
});
