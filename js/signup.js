const signUpButton = document.getElementById('signUp');
const registrationForm = document.getElementById('formRegistration');



registrationForm.addEventListener('submit', dataSendDb);

function dataSendDb(e){
    e.preventDefault();
    var xhr;

    let userFullName = document.getElementById('username').value;
    let userPublicName = document.getElementById('userpublicname').value;
    let userEmail = document.getElementById('useremail').value;
    let userPassword = document.getElementById('createpassword').value;

    const sendData = `fullname=${userFullName}&publicname=${userPublicName}&email=${userEmail}&password=${userPassword}`;

    xhr = new XMLHttpRequest();

    xhr.onprogress = function(){
        document.getElementById('signUp').value = '';
        document.querySelector('.processing').classList.add("active");
    };

    xhr.onload = function(){
        let responseMsg = null;
        try {
             responseMsg = JSON.parse(xhr.responseText);
        } catch (error) {
            console.error('could not parse error');
        }

        if (responseMsg) {
            handleResponse(responseMsg);
        }

        document.getElementById('signUp').value = 'Sign Up';
        document.querySelector('.processing').classList.remove("active");
        
    }
    xhr.open('POST', 'registration-form-process.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhr.send(sendData);
};


function handleResponse(r){
    let objMsg = r;
   let messages = objMsg.message;
   document.querySelector('.modal__x').style.display = 'block';
   messages.forEach((msg)=>{
    let msgHtml;
       if(msg === 'Registration Complete'){
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
           
            if (mg === 'Registration Complete') {
                location.href = './';
            }
        }, 3000, msg);
});
}