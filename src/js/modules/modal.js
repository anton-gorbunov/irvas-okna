function closeModal(modalOverlay,activeClass){
    const overlay = document.querySelector(modalOverlay);
    overlay.classList.remove(activeClass);
    document.body.style.overflow = '';
}
function modal(overlay,activeClass){
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
      modalOverlay = document.querySelector(overlay);
     
    function openModal(selector, messageArr){
        const elems = document.querySelectorAll(selector),
            title = document.querySelector('.overlay__title'),
            subtitle = document.querySelector('.overlay__subtitle');
        elems.forEach(item => {
            item.addEventListener('click',(event) => {
                event.preventDefault();
                modalOverlay.classList.add(activeClass);
                document.body.style.overflow = 'hidden';
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