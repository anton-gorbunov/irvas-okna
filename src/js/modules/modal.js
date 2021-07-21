function closeModal(modalOverlay,activeClass){
    const overlay = document.querySelector(modalOverlay);
    overlay.classList.remove(activeClass);
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
}
function modal(overlay,activeClass){

    function getScrollWidth(){
        const div = document.createElement('div');
        div.style.height = '50px';
        div.style.width = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        
        return scrollWidth;
    }

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
      modalOverlay = document.querySelector(overlay),
      scroll = getScrollWidth();
     
    function openModal(selector, messageArr){
        const elems = document.querySelectorAll(selector),
            title = document.querySelector('.overlay__title'),
            subtitle = document.querySelector('.overlay__subtitle');
        elems.forEach(item => {
            item.addEventListener('click',(event) => {
                event.preventDefault();
                modalOverlay.classList.add(activeClass);
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                title.innerHTML = messageArr.title;
                subtitle.innerHTML = messageArr.subtitle;
            });
        });
    }
  
    modalOverlay.addEventListener('click',(event) => {
        if (event.target.classList.contains('overlay__modal-close')){
            closeModal(overlay,activeClass);
        } 
    });
    document.addEventListener('keydown',(event) => {
        if (event.code == 'Escape'){
            closeModal(overlay,activeClass);
        }
    });
    modalOverlay.addEventListener('click',(event) => {
        if (event.target.classList.contains('overlay')){
            closeModal(overlay,activeClass);
        }
    });
    openModal('[data-measuring]', modalMessages.measuring);
    openModal('[data-call]', modalMessages.call);
    openModal('[data-calculate]', modalMessages.calculate);
}

export default modal;
export {closeModal};