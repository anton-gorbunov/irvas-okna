/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/forms.js":
/*!*********************************!*
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


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
                (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('mailer/smart.php',json)
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
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.overlay','overlay_active');
        }, 2500);
        setTimeout(() => {
            modalThanks.remove();
            modalPrev.classList.add('show');
            modalPrev.classList.remove('hide');
        },4000);
    }

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; }
/* harmony export */ });
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

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./src/js/modules/phoneMask.js":
/*!*************************************!*
  !*** ./src/js/modules/phoneMask.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function phoneMask(inputsSelector){
   function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    }
    function mask(event) {
        let matrix = '+7 (___) ___ ____',
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length){
            val = def;
        } 
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });
        if (event.type == 'blur') {
            if (this.value.length == 2) {
                this.value = "";
            }
        } else {
            setCursorPosition(this.value.length, this);
        } 
    }
    const inputs = document.querySelectorAll(inputsSelector);
    inputs.forEach(item => {
        item.addEventListener('blur', mask, false);
        item.addEventListener('input', mask, false);
        item.addEventListener('focus', mask, false);
    });
   
}

/* harmony default export */ __webpack_exports__["default"] = (phoneMask);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsParentSelector, tabsSelector, contentSelector, 
    linksActiveClass, contentActiveClass){
    const tabsParent = document.querySelector(tabsParentSelector),
          tabsLinks = tabsParent.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(contentSelector);

    function removeActiveClass(){
        tabsLinks.forEach(item => {
            item.classList.remove(linksActiveClass);
        });
        tabsContent.forEach(item => {
            item.classList.remove(contentActiveClass);
        });
    }
    function addActiveClass(i=0){
        tabsLinks[i].classList.add(linksActiveClass);
        tabsContent[i].classList.add(contentActiveClass,'fade');
    }
    removeActiveClass();
    addActiveClass();
        
    tabsParent.addEventListener('click',(event) => {
        event.preventDefault();
        let target = event.target;
        if(target == target && target.classList.contains(tabsSelector.slice(1))){
            tabsLinks.forEach((item, i) => {
                if (target == item) {
                    removeActiveClass();
                    addActiveClass(i);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(timerSelector, deadLine){
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

    setClock(timerSelector, deadLine);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/modules/toTop.js":
/*!*********************************!*
  !*** ./src/js/modules/toTop.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function toTop(btnSelector, activeClass){
    const btn = document.querySelector(btnSelector);

  document.addEventListener('scroll', () => {
      let scrolled = window.pageYOffset;
      let coords = document.documentElement.clientHeight;

      if (scrolled > coords ){
          btn.classList.add(activeClass);
      } else {
          btn.classList.remove(activeClass);
      }
  });

  btn.addEventListener('click', backToTop);
  
  function backToTop() {
      
      if (window.pageYOffset > 0) {
          window.scrollBy(0,-80);
          setTimeout(backToTop,0);
      } 
  }
}

/* harmony default export */ __webpack_exports__["default"] = (toTop);

/***/ }),

/***/ "./src/js/modules/zoom.js":
/*!********************************!*
  !*** ./src/js/modules/zoom.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (zoom);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/zoom */ "./src/js/modules/zoom.js");
/* harmony import */ var _modules_toTop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/toTop */ "./src/js/modules/toTop.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_phoneMask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/phoneMask */ "./src/js/modules/phoneMask.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");








document.addEventListener('DOMContentLoaded',() => {
   (0,_modules_zoom__WEBPACK_IMPORTED_MODULE_0__.default)({
        img:'.works__item',
        closeBtn:'.works__close',
        overlay:'.works__overlay',
        imgWindow:'.works__zoom img',
        arrowRight:'.works__right-arrow',
        arrowLeft:'.works__left-arrow',
        counter:'.works__count',
        overlayActiveClass:'works__overlay_active'
   });
   (0,_modules_toTop__WEBPACK_IMPORTED_MODULE_1__.default)('.up-btn', 'up-btn_active');
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.stock__timer', '2021-01-01');
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)('.balkon__tabs', '.balkon__link', '.balkon__content-block',
        'balkon__link_active', 'balkon__content-block_active');
   (0,_modules_phoneMask__WEBPACK_IMPORTED_MODULE_4__.default)('[data-phone]');
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__.default)('.overlay','overlay_active');
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__.default)('form');
});

















/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map