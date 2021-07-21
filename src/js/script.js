import zoom from './modules/zoom';
import toTop from './modules/toTop';
import timer from './modules/timer';
import tabs from './modules/tabs';
import phoneMask from './modules/phoneMask';
import modal from './modules/modal';
import forms from './modules/forms';

document.addEventListener('DOMContentLoaded',() => {
   zoom({
        img:'.works__item',
        closeBtn:'.works__close',
        overlay:'.works__overlay',
        imgWindow:'.works__zoom img',
        arrowRight:'.works__right-arrow',
        arrowLeft:'.works__left-arrow',
        counter:'.works__count',
        overlayActiveClass:'works__overlay_active'
   });
   toTop('.up-btn', 'up-btn_active');
   timer('.stock__timer', '2021-09-10');
   tabs('.balkon__tabs', '.balkon__link', '.balkon__content-block',
        'balkon__link_active', 'balkon__content-block_active');
   phoneMask('[data-phone]');
   modal('.overlay','overlay_active');
   forms('form');
});















