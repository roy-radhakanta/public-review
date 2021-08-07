//ui
const userInterFace = (function(){
	const uiSelectors = {
		editUserTrigger: '.dropdown-tooler',
		profileDropZone: '.profile__image--drop-zone',
		imgaeDropArea: '.profile__image--upload',
		cancelButton: '.cancel-button',
		dropArea: '.profile__image--upload',
		inputFile: '.profile__image--file',
		inputFirstName: '.first-name',
		inputLastName: '.last-name',
		inputUserDescription: '.user-description',
		folderImg: '.folder-open',
		textThumb: '.text-thumb',
		profileSubmitButton: '.submit-button',
		modalBody: '.modal__x--body',
		modalX: '.modal__x',
		sessionDataInput: '#toWhome'
	};

	const showError = function(errorArray){
		document.querySelector(uiSelectors.modalX).style.display = 'block';
		errorArray.forEach(element=>{
			const errorElem = '<div class="flex align-items-center justify-content-between drop__message"> <p class="danger-color">%error%</p> <div class="messages"> <div class="bubble__wrap"> <a href="#"> <div class="bubble__job"> <svg class="modal-cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 5.7070312 4.2929688 L 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 L 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 L 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 L 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 z"></path></svg> </div> </a> </div> </div> </div>';

			const newElem = errorElem.replace('%error%', element);
			document.querySelector(uiSelectors.modalBody).insertAdjacentHTML("afterbegin", newElem);

			setTimeout(()=>{
				let parent;
				parent = document.querySelector(uiSelectors.modalBody);
				while (parent.firstChild) {
					parent.removeChild(parent.firstChild);
				}
				document.querySelector(uiSelectors.modalX).style.display = 'none';
			}, 3000);
		});
	}
	
	return {
		selectorObject: function(){
			return uiSelectors;
		},
		dragNDrop: function(){
			return drop(event);
		},
		addClass: function(selectorName, classToAdd){
			document.querySelector(selectorName).classList.add(classToAdd);
		},
		removeClass: function(selectorName, classToRemove){
			document.querySelector(selectorName).classList.remove(classToRemove);
		},
		toggleClass: function(selectorName, classToToggle){
			document.querySelector(selectorName).classList.toggle(classToToggle);
		},
		showErrorx: function(errorArray){
			return showError(errorArray);
		},
		clearFields: function(inputArray){
			inputArray.forEach((elementInput)=>{
				elementInput.value = "";
			});
		},
		profileInputData: function(){
			return {
				profileImg: document.querySelector(uiSelectors.inputFile).files,
				firstName: document.querySelector(uiSelectors.inputFirstName).value,
				lastName: document.querySelector(uiSelectors.inputLastName).value,
				userDescription: document.querySelector(uiSelectors.inputUserDescription).value
			}
		}
	}
})();



//data model
const dataModel = (function(){
	
	const dataBase = {	
		repo: [],
		error: [],
		session: 0
	};

	const sessionValueStore = function(){
		let userSession = sessionStorage.getItem('setlog');
		if(userSession !== null){
			dataBase.session = userSession;
		}
	};

	const ajaxHandle = function(objectUserData, formSelf){
		
		// let formData = new FormData(formSelf);
		// // formData.append('toWhome', userSession);
		// formData.append('profileImage[]', objectUserData.profileImg);
		// formData.append('firstname', objectUserData.firstName);
		// formData.append('lastname', objectUserData.lastName);
		// formData.append('description', objectUserData.userDescription);
			

		const dataToSend = `profileImage=${objectUserData.profileImg}&firstname=${objectUserData.firstName}&lastname=${objectUserData.lastName}&description=${objectUserData.userDescription}`;

		const ajax = new XMLHttpRequest();

		ajax.onload = function(){
			try {
				const responseVal = JSON.parse(ajax.responseText);
				console.log(responseVal);
				dataBase.repo.push(responseVal);
			} catch(error){
				dataBase.error.push(error);
			}
		}

		ajax.open('POST', 'profile-data-updater.php', true);
		// ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(dataToSend);
	};
	

	return {
		ajaxProfile: function(arrayOb, formSelf){
			return ajaxHandle(arrayOb, formSelf);
		},
		dataBase: function(){
			return dataBase;
		},
		sessionControl: function(){
			return sessionValueStore();
		}

	};
})();



//controller 
const controller = (function(ui, data){
	var uiSelector, dropZone, dropInput;

	//events
	var allEventController = function(){
		uiSelector = ui.selectorObject();
		dropZone = document.querySelector(uiSelector.imgaeDropArea);
		dropInput = document.querySelector(uiSelector.inputFile);
		document.querySelector(uiSelector.editUserTrigger).addEventListener('click', controlEditPanel);
		document.querySelector(uiSelector.cancelButton).addEventListener('click', cancel);
		window.addEventListener('load', checkSession);
		['dragenter', 'dragover'].forEach((currentEvent)=>{
			dropZone.addEventListener(currentEvent, dragIndication);
		});
		['dragleave', 'dragend'].forEach((currentEvent)=>{
			dropZone.addEventListener(currentEvent, resetDragActivity);
		});
		dropInput.addEventListener('drop', handleDroppedFile);
		dropInput.addEventListener('change', handleFileInput);
	}
	
	//functions
	const controlEditPanel = function(event){
		event.preventDefault();
		ui.toggleClass(uiSelector.profileDropZone, 'active');
	};
	const cancel = function(event){
		event.preventDefault();

		ui.removeClass(uiSelector.profileDropZone, 'active');
	};
	const dragIndication = function(event){
		event.preventDefault();
		ui.addClass(uiSelector.imgaeDropArea, "touched");
	};
	const resetDragActivity = function(event){
		document.querySelector(uiSelector.folderImg).src = 'img/drop-zone.png';
		ui.removeClass(uiSelector.imgaeDropArea, "touched");		
	};
	
	//drag file input
	const handleDroppedFile = function(droppedEvent){
		let fileReader = new FileReader();
		const file = droppedEvent.dataTransfer.files[0];
		const fileNameCheck = file.name;
		const fileSplitArr = fileNameCheck.split('.');
				
	if(fileSplitArr[1]==='png' || fileSplitArr[1]==='jpg'|| fileSplitArr[1]==='jpeg'){
		fileReader.readAsDataURL(file);
		fileReader.onload = ()=>{
			document.querySelector(uiSelector.folderImg).style.width = '140px';
			document.querySelector(uiSelector.folderImg).style.marginBottom = '0';
			document.querySelector(uiSelector.textThumb).style.display = 'none';
			document.querySelector(uiSelector.folderImg).src = fileReader.result;
		}
		dropInput.files = droppedEvent.dataTransfer.files;
		
	}else{
			ui.showErrorx(['Whoops!, wrong file type']);
		}
	}

	//click file input
	const handleFileInput = function(){
		let fileReader = new FileReader();
		const files = dropInput.files;
		const file = files[0];
		const fileNameCheck = file.name;
		const fileSplitArr = fileNameCheck.split('.');
				
	if(fileSplitArr[1]==='png' || fileSplitArr[1]==='jpg'|| fileSplitArr[1]==='jpeg'){
		fileReader.readAsDataURL(file);
		fileReader.onload = ()=>{
			document.querySelector(uiSelector.folderImg).style.width = '140px';
			document.querySelector(uiSelector.folderImg).style.marginBottom = '0';
			document.querySelector(uiSelector.textThumb).style.display = 'none';
			document.querySelector(uiSelector.folderImg).src = fileReader.result;
		}
	}else{
			ui.showErrorx(['Whoops!, wrong file type']);
		}
	}
	

	const updateUserProfile = function(event){
		event.preventDefault();
		const allProfileData = ui.profileInputData();
		data.ajaxProfile(allProfileData, dropInput);
	}
	
	const checkSession = function(){
		data.sessionControl();
		const sessionData = data.dataBase();
		if(sessionData.session){
			document.querySelector(uiSelector.sessionDataInput).value = sessionData.session;
		}else{
			location.href="index.html";
		}	
	}

	return {
		init: function(){
			allEventController();
		}
	}
})(userInterFace, dataModel);

controller.init();