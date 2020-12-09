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

export default timer;