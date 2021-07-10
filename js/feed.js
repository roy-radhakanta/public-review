const ui = (function(){
    const selectorClass = {
        modal: '.popup__xml',
        show: '.show',
        addQuestionBtn: '.add__question--btn',
        modalCross: '.cross'
    }

    return {
        selectors: function(){
            return selectorClass;
        }
    }
})();


const userCredentialControl = (function(){
    let cred = sessionStorage.getItem('setlog');
       
        return {
            checkAuth: function(){
                return cred;
            }
        }
})();

const controller = (function(ui, credCtrl){
    const selector = ui.selectors();

    const eventHandelar = function(){
        window.addEventListener('load', checkAuth);
        document.querySelector(selector.addQuestionBtn).addEventListener('click', ()=>{
            document.querySelector(selector.modal).classList.toggle('show');
        });
        document.querySelector(selector.modalCross).addEventListener('click', ()=>{
            document.querySelector(selector.modal).classList.remove('show');
        });
    };

    const checkAuth = function(){
        let user = credCtrl.checkAuth();
        if (user === null) {
            location.href = './';
        }
    };

    return {
        init: function(){
            return eventHandelar();
        }
    };
})(ui, userCredentialControl);

controller.init();