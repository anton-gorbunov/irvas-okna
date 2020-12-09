import {closeModal} from './modal';
import {postData} from '../services/services';
function forms(form){
    const forms = document.querySelectorAll(form),
          message = {
            loading: 'icons/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
            error: 'Некорректный номер телефона'
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
        document.querySelector('.overlay').classList.add('overlay_active');
        modalPrev.classList.add('hide');
        let modalThanks = document.createElement('div');
        modalThanks.classList.add('form','form_min','overlay__form');
        modalThanks.innerHTML = `
        <div class="modal__content">
            <div class="overlay__modal-close">&times;</div>
            <div class="form-title overlay__title">${message}</div>
        </div>`;
        document.querySelector('.overlay__modal').append(modalThanks);
        setTimeout(() => {
                closeModal('.overlay','overlay_active');
        }, 2500);
        setTimeout(() => {
            modalThanks.remove();
            modalPrev.classList.add('show');
            modalPrev.classList.remove('hide');
        },4000);
    }

}

export default forms;