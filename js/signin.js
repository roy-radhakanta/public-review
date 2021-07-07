var ui = (function(){
    const selector = {
        form: '.signin__form',
        email: '.signin_id',
        passLabel: '.signin_cres',
        modal: '.modal__x',
        modalBody: '.modal__x--body'
    };
    return{
         userDetails: function(){
            return {
                emailValue: document.querySelector(selector.email).value,
                passValue: document.querySelector(selector.passLabel).value,
                signInForm: document.querySelector(selector.form)
            };
        },
        identifier: function(){
            return selector;
        }
    };
})();

const ajax = (function(u){
    const allIdentifier = u.identifier();
    const handleEvents = function(){
        document.querySelector(allIdentifier.form).addEventListener('submit', startRequesting);
    }
    const startRequesting = function(event){
        let userEmail = document.querySelector(allIdentifier.email).value;
        let userPassword = document.querySelector(allIdentifier.passLabel).value;
        event.preventDefault();
        var credential = `email=${userEmail}&password=${userPassword}`;

        xhr = new XMLHttpRequest();
        xhr.onload = function(){
            let responseRes;
            responseRes = null;
            try{
                responseRes = JSON.parse(xhr.responseText);
            }
            catch(error){
                responseRes = error;
            }
           
            handleResult(responseRes);
        }
        xhr.open('POST', 'check-signin.php', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.send(credential);
    }
    let handleResult = function(response){
        let objMsg = response;
        let messages = objMsg.message;
        document.querySelector('.modal__x').style.display = 'block';
        messages.forEach((msg)=>{
         let msgHtml;
            if(msg === 'success'){
                  msgHtml = '<div class="flex align-items-center justify-content-between drop__message"> <p class="hooray-color">%msg%</p> <div class="messages"> <div class="bubble__wrap"> <a href="#"> <div class="bubble__job"><svg class="modal-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg> </div> </a> </div> </div> </div>';
            }else{
                  msgHtml = '<div class="flex align-items-center justify-content-between drop__message"> <p class="danger-color">%msg%</p> <div class="messages"> <div class="bubble__wrap"> <a href="#"> <div class="bubble__job"> <svg class="modal-cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 5.7070312 4.2929688 L 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 L 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 L 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 L 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 z"></path></svg> </div> </a> </div> </div> </div>';
            }
             
             let newHtml = msgHtml.replace('%msg%', msg);
             document.querySelector('.modal__x--body').insertAdjacentHTML("afterbegin", newHtml);
     
             setTimeout((mg)=>{
                 let parent;
                 parent = document.querySelector('.modal__x--body');
                 while (parent.firstChild) {
                     parent.removeChild(parent.firstChild);
                   }
                   
                 document.querySelector('.modal__x').style.display = 'none';
                
                 if (mg === 'success') {
                     let user = objMsg.wYuZrk;
                    sessionStorage.setItem('setlog', user);
                    location.href = 'feed.html';
                 }
             }, 3000, msg);
     });
    }

    return {
        initFnc: function(){
            return handleEvents();
        },
        test: function(){
            return allCredential;
        }
    };

})(ui);

ajax.initFnc();

