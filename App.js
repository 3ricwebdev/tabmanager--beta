const body = document.querySelector('body')
const app = document.querySelector('#app');
const button = `<div id="addTabBtn" class="add-tab-btn">+</div>`;
const tabsWindow = document.querySelector('#tabsWindow');
let tabsStorage = [];
 
class Tab {
    constructor(title, href) {        
        this.id = Date.now();
        this.title = title;
        this.href = href;
    }
}


// enent listeners
document.onload = parseLS();

// fuctions
function parseLS() {
    let savedTabs = localStorage.getItem('savedTabs');
    if (savedTabs) {
        tabsStorage = JSON.parse(savedTabs);
        renderTabsWindow(tabsStorage);             
    } else {
        renderTabsWindow(tabsStorage);  
    }
      
}

function renderTabsWindow(tabsStorage) {    
    tabsWindow.innerHTML = '';
    tabsStorage.forEach(element => {
        let component = `
        <div id="tabsWindowEl" class="tabs-window_el" data-id="${element.id}">
            <div id="tabsWindowRemoveEl" data-action="removeEl">🗑️</div>
            <a href="${element.href}" class="tabs-window_el-link">
                <p class="tabs-window_el-title">${element.title}</p>
            </a>
        </div>  
        `             
        tabsWindow.insertAdjacentHTML('beforeend', component);          
    });      
    tabsWindow.insertAdjacentHTML('beforeend', button);   
    const addTabBtn = document.querySelector('#addTabBtn');
    addTabBtn.addEventListener('click', openPopup);
    tabsWindow.addEventListener('click', removeTab); 
}

const setToLs = () => {
    localStorage.setItem('savedTabs', JSON.stringify(tabsStorage));    
    parseLS();
}

function addTab () {
    const popupInputUrl = document.querySelector('#popupInputUrl').value;
    const popupInputTitle = document.querySelector('#popupInputTitle').value;

    const checkInput = () => {
        switch (true) {
            case popupInputUrl == 0 && popupInputTitle == 0 : notify('BAD_DATA')
            break;
            case popupInputUrl == 0 : notify('BAD_URL')
            break;
            case popupInputTitle == 0 : notify('BAD_TITLE')
            break;
            default: {
                let href = popupInputUrl;
                let title = popupInputTitle;
                let temp = new Tab (title, href);
                tabsStorage.push(temp);      
                setToLs();                
            }
            break;
        }
    }
    checkInput();
}

function openPopup () {
    const popup = `
        <div id="addTabOverlay" class="add-tab-overlay"></div>
        <div id="addTabPopup" class="add-tab-popup">
            <div id="addTabPopupDone">✔️</div>
            <div id="addTabPopupClose">❌</div>
            <input id="popupInputUrl" placeholder="Input url" type="text" data-type="url">
            <input id="popupInputTitle" placeholder="Input title" type="text" data-type="title">
        </div>
        `
    app.insertAdjacentHTML('beforeend', popup);
    const addTabPopupDone = document.querySelector('#addTabPopupDone');
    const addTabPopupClose = document.querySelector('#addTabPopupClose');
    addTabPopupDone.addEventListener('click', addTab)
    addTabPopupClose.addEventListener('click', closePopup)    
}

function closePopup () {
    const addTabOverlay = document.querySelector('#addTabOverlay');
    const addTabPopup = document.querySelector('#addTabPopup');
    app.removeChild(addTabOverlay);
    app.removeChild(addTabPopup);
}

function removeTab(event) {
    if (event.target.dataset.action !== 'removeEl') return;
    const tabsWindowEl = event.target.closest('#tabsWindowEl');
    const tabsWindowElId = tabsWindowEl.getAttribute('data-id');
    const tabId = Number(tabsWindowElId);
    tabsStorage = tabsStorage.filter(tab => tab.id !== tabId);
    setToLs();
}

function notify(ERR_CODE) {
    const ERRORS = [
        {
            BAD_DATA: 'Please, enter a title and URL',
            BAD_URL: 'Please, enter correct URL',
            BAD_TITLE: 'Please, enter correct title'
        }       
    ];
    console.log(ERR_CODE)
    for (const CODE in ERRORS) {
        if (ERRORS[CODE] == ERR_CODE) {
            const element = ERRORS[ERROR_CODE];
            console.log(element)
        }
    }
    const notification = `
        <div id="notice" class="notice">
            <span>🐸</span>
            <p>Ошибка </p>           
        </div>
    `
    body.insertAdjacentHTML('afterbegin', notification)
    setTimeout(() => {        
        body.removeChild(document.querySelector('#notice'))
    }, 3100);
}




