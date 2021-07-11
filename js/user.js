const userUi = (function(){
    const profileSelector = {
        profileName: '.profile__name',
        profileIntro: '.profile__intro'
    }

    return {
        funcShowData: function(objectData){
            document.querySelector(profileSelector.profileName).textContent = objectData.data.user_name;
        }
    };
})();

const requests = (function(){
    let userDataObject = new Promise((resolve, reject)=>{
        let xhr, user, data;
        user = sessionStorage.getItem('setlog');
        data = `userid=${user}`;
        xhr = new XMLHttpRequest();
        xhr.onload = function(){
            let userIdentify = null;
            try {
               userIdentify = JSON.parse(xhr.responseText);
               resolve(userIdentify);
            } catch (error) {
                userIdentify = error;
                reject(userIdentify);
            }
        }
        xhr.open('POST', 'user.php', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    });
    return {
        userObj: function(){
            return userDataObject;
        }
    }
})();

const userController = (function(ui, req){
    
   req.userObj().then(usr => {
        ui.funcShowData(usr);
    });

    

    // return {
    //     init: function(){
    //         return data;
    //     }
    // };  
})(userUi, requests);

// userController.init();
