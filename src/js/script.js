document.addEventListener('DOMContentLoaded',() => {
    //tabs
    const tabsParent = document.querySelector('.balkon__tabs'),
          tabsLinks = tabsParent.querySelectorAll('.balkon__link'),
          tabsContent = document.querySelectorAll('.balkon__content-block');

    function removeActiveClass(){
        tabsLinks.forEach(item => {
            item.classList.remove('balkon__link_active');
        });
        tabsContent.forEach(item => {
            item.classList.remove('balkon__content-block_active');
        });
    }
    function addActiveClass(i=0){
        tabsLinks[i].classList.add('balkon__link_active');
        tabsContent[i].classList.add('balkon__content-block_active','fade');
    }
    removeActiveClass();
    addActiveClass();
        
    tabsParent.addEventListener('click',(event) => {
        event.preventDefault();
        let target = event.target;
        if(target == target && target.classList.contains('balkon__link')){
            tabsLinks.forEach((item, i) => {
                if (target == item) {
                    removeActiveClass();
                    addActiveClass(i);
                }
            });
        }
    });
    //zoom

    const images = document.querySelectorAll('.works__item'),
          closeImg = document.querySelector('.works__close'),
          imagesOverlay = document.querySelector('.works__overlay'),
          imgFrame = document.querySelector('.works__zoom img'),
          arrowNext = document.querySelector('.works__right-arrow'),
          arrowLast = document.querySelector('.works__left-arrow');
    let slideIndex = 0;
    function closeOverlay(){
        imagesOverlay.classList.remove('works__overlay_active');
    }
    function showNextSlide(){
        if (slideIndex == images.length-1){ 
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        imgFrame.src = `img/works/${slideIndex+1}.jpg`;
    }
    function showPreviousSlide(){
        if (slideIndex == 0){
            slideIndex = images.length-1;
        } else {
            slideIndex--;
        }
        imgFrame.src = `img/works/${slideIndex+1}.jpg`;
    }

    closeImg.addEventListener('click',() => {
        closeOverlay();
    });
    imagesOverlay.addEventListener('click',(event) => {
        if (event.target.classList.contains('works__overlay')){
            closeOverlay();
        }
    });
    document.addEventListener('keydown',(event) => {
        if (event.code == 'Escape'){
            closeOverlay();
        }
    });
    images.forEach((item,i) => {
        item.addEventListener('click',(event) => {
            if(event.target.closest('.works__item')){
                imagesOverlay.classList.add('works__overlay_active');
                imgFrame.src = `img/works/${i+1}.jpg`;
                slideIndex = i;
            }
        });
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


});