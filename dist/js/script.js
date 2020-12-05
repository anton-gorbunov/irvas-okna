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
          arrowLast = document.querySelector('.works__left-arrow'),
          slidesCount = document.querySelector('.works__count');
    let slideIndex = 0;
    function closeOverlay(){
        imagesOverlay.classList.remove('works__overlay_active');
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
                document.body.style.overflow = 'hidden';
                slideIndex = i;
                changeSlide();
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

    //timer
    const  deadLine = '2021-01-01';

    function getTimeRemaining(endTime){
        let timeDiff = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(timeDiff / (1000 * 60 * 60 *24)),
            hours = Math.floor((timeDiff / (1000 * 60 *60)) % 24),
            minutes = Math.floor((timeDiff /(1000 * 60)) % 60),
            seconds = Math.floor((timeDiff / 1000) % 60);

        return {
            total: timeDiff,
            days:days,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        };
    }

    function addZero(num){
        if (num>=0 && num<=9) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
                days = timer.querySelector('.timer__days'),
                hours = timer.querySelector('.timer__hours'),
                minutes = timer.querySelector('.timer__minutes'),
                seconds = timer.querySelector('.timer__seconds'),
                timeInterval = setInterval(updateClock, 1000);
        
        updateClock();
                
        function updateClock(){
            const timeObj = getTimeRemaining(endTime);

            days.innerHTML = addZero(timeObj.days);
            hours.innerHTML = addZero(timeObj.hours);
            minutes.innerHTML = addZero(timeObj.minutes);
            seconds.innerHTML = addZero(timeObj.seconds);

            if (timeObj.total <= 0){
                clearInterval(timeInterval);
            }
        }
               
    }

    setClock('.stock__timer', deadLine);

    //modal

    const modalMessages = {
            call:{
                title:'Закажите сейчас',
                subtitle:'обратный звонок'
            },
            measuring:{
                title:'Запишитесь сегодня на',
                subtitle:'бесплатный замер'
            },
            calculate:{
                title:'Рассчитать стоимость',
                subtitle:'со скидкой'
            }
          }, 
          modalOverlay = document.querySelector('.overlay');
         
    function openModal(selector, messageArr){
        const elems = document.querySelectorAll(selector),
              title = document.querySelector('.overlay__title'),
              subtitle = document.querySelector('.overlay__subtitle');
        elems.forEach(item => {
            item.addEventListener('click',(event) => {
                event.preventDefault();
                modalOverlay.classList.add('overlay_active');
                document.body.style.overflow = 'hidden';
                title.innerHTML = messageArr.title;
                subtitle.innerHTML = messageArr.subtitle;
            });
        });
    }
    function closeModal(){
        modalOverlay.classList.remove('overlay_active');
        document.body.style.overflow = '';
    }
    modalOverlay.addEventListener('click',(event) => {
        if (event.target.classList.contains('overlay__modal-close')){
            closeModal();
        } 
    });
    document.addEventListener('keydown',(event) => {
        if (event.code == 'Escape'){
            closeModal();
        }
    });
    modalOverlay.addEventListener('click',(event) => {
        if (event.target.classList.contains('overlay')){
            closeModal();
        }
    });
    openModal('[data-measuring]', modalMessages.measuring);
    openModal('[data-call]', modalMessages.call);
    openModal('[data-calculate]', modalMessages.calculate);

    //forms

    const forms = document.querySelectorAll('form'),
          message = {
            loading: 'icons/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
    };
    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:data
        });
        return await result;
    };
    forms.forEach(item => {
        bindPostData(item);
    });
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('overlay__spiner');
            
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('mailer/smart.php',json)
            .then(() => {
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                statusMessage.remove();
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message){
        const modalPrev = document.querySelector('.overlay__form');
        modalOverlay.classList.add('overlay_active');
        modalPrev.classList.add('hide');
        let modalThanks = document.createElement('div');
        modalThanks.classList.add('form','form_min');
        modalThanks.innerHTML = `
        <div class="modal__content">
            <div class="overlay__modal-close">&times;</div>
            <div class="form-title overlay__title">${message}</div>
        </div>`;
        document.querySelector('.overlay__modal').append(modalThanks);
        setTimeout(() => {
                closeModal();
        }, 2500);
        setTimeout(() => {
            modalThanks.remove();
            modalPrev.classList.add('show');
            modalPrev.classList.remove('hide');
        },4000);
    }
});

