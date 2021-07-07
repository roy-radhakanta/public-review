const ui = (function(){

})();

const controller = (function(u){
    const eventHandelar = function(){
        window.addEventListener('load', checkAuth);
    };

    const checkAuth = function(){
        
    };

    return {
        init: function(){
            return eventHandelar();
        }
    };
})(ui);

controller.init();