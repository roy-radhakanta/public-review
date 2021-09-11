//check for the activation status if not activated redirect to profile page to complete the profile
// -> take and store the user from session
// -> make a ajax request for checking the user exits or not if exits then check for activation
// -> if not activated redirect it to the profile update page
// -> update the status and insert all the data to registered user table
// -> table will contain the user id, profile image, description, linkedin profile github profile private / public toggle information user's activity -> post sent -> post review -> like -> dislike follower follow
// -> if activated 
//update the profile by updating the status and registered users list 
//redirect to the feed page and show loggedin user's data
//it will update profile page after activation
//it will update profile privacy setting
//show all activity and posts statistic to the user dashboard
//likes dislikes comments..
//notifications


//ui
const uiModule = (function(){
    const profileIdentifier = {
        profileName: '.profile-name'
    };
})();


//data
const dataModule = (function(){
        
    const dataBase = [];
    let userActivationCheck = new Promise((resolve, reject) => {
        let userSession = sessionStorage.getItem('setlog');
        let queryData;
        if(userSession==null){
            queryData = `usercheck=`;
            location.href="index.html";
        }else{
            queryData = `usercheck=${userSession}`;
        }
		
        let xhr = new XMLHttpRequest();
        xhr.onload = function (){
            let result = null;
            try {
                result = JSON.parse(xhr.responseText);
                dataBase.push(result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };
        xhr.open('POST', 'controller/user.php', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(queryData);
    });

    return {
        sessionStorage: function () {
            return userSession;
        },
        ajaxRequest: function(){
            return userActivationCheck;
        },
        dataBase: function(){
            return dataBase;
        }
    
    }
})();


//Controller
const controllerModule=(function(ui, data) {

    var controllEvents = function(){
		
        setInterval(checkUserActivation, 3000);
		
    }

    const checkUserActivation = function(){
        data.ajaxRequest().then(det=>{
            if(det.query === "true"){
                redirect(det.query);
            }
        });    
    }

    const redirect = function(value){
        if(value=='true'){
            location.href = './profile.html';
        }
    }


    return {
        init: function(){
            return controllEvents();
        }
    }
})(uiModule, dataModule);

controllerModule.init();