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

export default tabs;