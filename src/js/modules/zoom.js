function zoom({img,closeBtn,overlay,imgWindow,arrowRight,arrowLeft,counter,overlayActiveClass}){
    const images = document.querySelectorAll(img),
          closeImg = document.querySelector(closeBtn),
          imagesOverlay = document.querySelector(overlay),
          imgFrame = document.querySelector(imgWindow),
          arrowNext = document.querySelector(arrowRight),
          arrowLast = document.querySelector(arrowLeft),
          slidesCount = document.querySelector(counter);
    
    let slideIndex = 0,
    width = window.getComputedStyle(document.body).width;
    width = +width.slice(0,width.length-2);

    function closeOverlay(){
    imagesOverlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
    }
    function changeSlide(){
    imgFrame.src = `img/work/${slideIndex+1}.jpg`;
    slidesCount.innerHTML = `${slideIndex+1} / ${images.length}`;
    }
    function showNextSlide(){
    if (slideIndex == images.length-1){ 
        slideIndex = 0;
    } else {
        slideIndex++;
    }
    changeSlide();
    }
    function showPreviousSlide(){
    if (slideIndex == 0){
        slideIndex = images.length-1;
    } else {
        slideIndex--;
    }
    changeSlide();
    }
    closeImg.addEventListener('click',() => {
    closeOverlay();
    });
    document.addEventListener('keydown',(event) => {
    if (event.code == 'Escape'){
        closeOverlay();
    }
    });
    images.forEach((item,i) => {
    if (width > 576){
        item.addEventListener('click',(event) => {
            if(event.target.closest(img)){
                imagesOverlay.classList.add(overlayActiveClass);
                document.body.style.overflow = 'hidden';
                slideIndex = i;
                changeSlide();
            }
        });
    }
    });
    arrowLast.addEventListener('click',() => {
    showPreviousSlide();      
    });
    arrowNext.addEventListener('click',() => {
    showNextSlide();
    });
    document.addEventListener('keydown',(event) =>{
    if (event.code == 'ArrowLeft'){
        showPreviousSlide();  
    }else if (event.code == 'ArrowRight'){
        showNextSlide();
    }
    });
}

export default zoom;