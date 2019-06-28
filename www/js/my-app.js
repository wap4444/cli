// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

if(!localStorage.user){
	
}









// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('userArea', function (page) {

	if(localStorage.userPic){
		$('#userPic').attr('src',localStorage.userPic);
	}
	
$( "#userPic" ).click(function() {
	navigator.camera.getPicture(onSuccessUserPic, onFailUserPic, { quality: 25,
    destinationType: Camera.DestinationType.DATA_URL
});
	});

});

myApp.onPageInit('userArea', function (page) {
});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') { 
console.log('ready ');
navigator.geolocation.getCurrentPosition(onSuccessGEO, onErrorGEO);
		
		
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [localStorage.latitude, localStorage.longitude],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        }),



        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/car.png',
            // Размеры метки.s=
            iconImageSize: [52, 52],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-26, -52]
        });

    myMap.geoObjects
        .add(myPlacemark);
});
    }
})
////
    var onSuccessGEO = function(position) {
		localStorage.latitude=position.coords.latitude ;
		localStorage.longitude=position.coords.longitude ;
    };

    // onError Callback receives a PositionError object
    //
    function onErrorGEO(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
/////////////////////////КАМЕРА АВАТАРКИ
function onSuccessUserPic(imageData) {
  var image = document.getElementById('userPic');
  	localStorage.userPic="data:image/jpeg;base64," + imageData;
    image.src = localStorage.userPic;

}

function onFailUserPic(message) {
    alert('Failed because: ' + message);
}



// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {

})