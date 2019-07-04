var $$ = Dom7;
var myApp = new Framework7({
	    modalTitle: 'ВезуЕду',
		modalButtonCancel: 'Отмена',
		pushState: true,
		fastClicks: true,
		uniqueHistory: true,
		modalPreloaderTitle: 'Загрузка...',
		
	onPageInit: function (myApp, page) {
	    if (page.name === 'index') {

		var mySwiper = myApp.swiper('.swiper-container', {
		pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
		loop: true
  });
  
  var onSuccess = function(position) {
		localStorage.latitude=position.coords.latitude ;
		localStorage.longitude=position.coords.longitude ;
};
function onError(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
		localStorage.latitude='52.285577';
		localStorage.longitude='76.940947';
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
  

//ДАННЫЕ О КЛИЕНТЕ
if(localStorage.user_adres){
	$$('#geoCoderAdres').html(localStorage.user_adres);
}
//
  ////КАРТА
ymaps.ready(init);
var myMap;

function init () {
	
$('#geoCoderAdres').bind({click: function () {
	 if (!myMap) {
myMap = new ymaps.Map("karta", {
        center: [localStorage.latitude, localStorage.longitude], // Углич
        zoom: 17,
		controls: ['zoomControl']
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });
myMap.controls.add(new CrossControl);
myMap.events.add('boundschange', function (event) {
    if (event.get('oldCenter') != event.get('newCenter')) {
		var coords = event.get('newCenter');
$.ajax({type: 'GET',url:'https://geocode-maps.yandex.ru/1.x/',data:{apikey:'078d7cfd-d8b8-48d1-b851-660305961e5c',format:'json',geocode:coords[1].toPrecision(6)+','+coords[0].toPrecision(6)},success: function(dataGeo){
$('#geoCoderAdres').html(dataGeo.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name+', '+dataGeo.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[5].name);
$('#onMapAdres').html(dataGeo.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name+', '+dataGeo.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[5].name);
localStorage.user_adres=dataGeo.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name+', '+dataGeo.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[5].name;

}
});
}
});
	 }
	    }
});
$('#close_map').bind({click: function () {
	if (myMap) {
myMap.destroy();
myMap = null;
	}
}
});
$('#imHereBtn').bind({click: function () {
}
});

 
	




}
////#КАРТА
$$.post('http://vezuedu.kz/v4/api/kafe.php', {}, function (data) {
kafeSpisok = JSON.parse(data);
if ( kafeSpisok.length == 0 ) {
	myApp.alert("Кафе не найдены(((");
}
else{

$.each(kafeSpisok, function(key, data) {
if(kafeSpisok[key].status=='open'){
	$('#kafe_spisok_open').append('\
	<div class="card demo-card-header-pic">\
	\
  <div style="background-image:url(http://vezuedu.kz/'+kafeSpisok[key].logo+')" valign="bottom" class="card-header color-white no-border" style="padding:0px;"><div class="cafeName"><a  href="kafe.html?id='+kafeSpisok[key].id+'&logo='+kafeSpisok[key].logo+'&name='+kafeSpisok[key].name+'">'+kafeSpisok[key].name+'</a></div></div>\
  <div class="card-footer" style="padding:5px">\
    <div class=" cafeNameOpis">'+kafeSpisok[key].vremya+' мин<br><span>Время доставки</span></div>\
    <div class=" cafeNameOpis">'+kafeSpisok[key].cenadost+' тенге<br><span>Цена доставки</span></div>\
    <div class=" cafeNameOpis">'+kafeSpisok[key].minsumma+' тенге<br><span>Мин. сумма</span></div>\
  </div>\
\
</div>');	
}else{
	$('#kafe_spisok_close').append('<li><a  href="kafe.html?id='+kafeSpisok[key].id+'&status=close"><div class="item-link item-content"><div class="item-media"><img class="off" src="http://vezuedu.kz/'+kafeSpisok[key].logo+'" height="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+kafeSpisok[key].name+'</div></div><div class="vyborkafe"><div class="item-subtitle">Время доставки '+kafeSpisok[key].vremya+' минут</div><div class="item-subtitle">Цена доставки '+kafeSpisok[key].cenadost+' тенге</div><div class="item-subtitle">Мин. сумма '+kafeSpisok[key].minsumma+' тенге</div></div></div></div></a></li>');	
}
	});
}
});

}


	
}
});


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
	
    if (page.name === 'kafe') {
myApp.showIndicator();
	var	photos_arr=[];
	var myPhotoBrowserDark;
//Получаем инфу о кафе
	$('#kafemenu').empty();
	
	var kafeid = page.query.id;
	$('#cartlink').attr('href','cart.html?cafeid='+kafeid)
$$.post('http://vezuedu.kz/v4/api/kafe_id.php', {id:kafeid}, function (data) {
	kafeinfo = JSON.parse(data);
	kafestatus=kafeinfo.level0[kafeid].status;

	if(kafestatus=='close'){myApp.alert('Кафе временно не принимает заказы');}
	
	$('#kafename span').html(kafeinfo.level0[kafeid].name);
	$('#kafe_info_minz').html(kafeinfo.level0[kafeid].minsumma+' тнг');
	localStorage.kafe_minsumma=kafeinfo.level0[kafeid].minsumma;
	localStorage.dostavkamin=kafeinfo.level0[kafeid].dostavkamin;
	$('#kafe_info_stdost').html(kafeinfo.level0[kafeid].cenadost+' тнг');
	localStorage.kafe_cenadost=kafeinfo.level0[kafeid].cenadost;
	$('#kafe_info_srvr').html(kafeinfo.level0[kafeid].vremya+' мин');


	timestart=kafeinfo.level0[kafeid].timestart.substring(11);
	timeend=kafeinfo.level0[kafeid].timeend.substring(11);
	timestart=timestart.slice(0,-3);	timeend=timeend.slice(0,-3);
	if(timestart=='00:00' && timeend=='23:59'){
	$('#kafe_opis').append('<b>Режим работы </b><br> КРУГЛОСУТОЧНО');
	}else{
		if(timeend=='23:59'){
			timeend='00:00';
		}
	$('#kafe_opis').append('<b>Режим работы </b><br> С '+ timestart+ ' до '+ timeend);	
	}
	myApp.hideIndicator();
});

/////МЕНЮ ЗАВЕДЕНИЯ
//Получаем название категорий
$$.post('http://vezuedu.kz/v4/api/kafe_menu_cat.php', {id:kafeid}, function (data) {
kafemenucat = JSON.parse(data);
$.each(kafemenucat, function(key, data) {
$('#kafemenu').append('<hr>'+kafemenucat[key].catName+'<hr>');
$.each(kafemenucat[key].food, function(key1, data1) {
$('#kafemenu').append('<div class="row foodBlock"  style="position:relative;">\
<div class="col-33"><img class="lazy eda_img" src="http://vezuedu.kz/zagruzki/'+kafemenucat[key].food[key1].image+'" width="100%"><span class="foodPrice">'+kafemenucat[key].food[key1].cenaeda+' тг.</span></div>\
<div class="col-66">'+kafemenucat[key].food[key1].nameeda+'<br>\
'+kafemenucat[key].food[key1].sostav+'<br>\
<a href="#" class="button button-round active" >ЗАКАЗАТЬ</a>\
</div>\
</div>');
});

});

});

/////////////




var kafe_logo = page.query.logo;
$('#kafe_logo').css('background-image', 'url(http://vezuedu.kz/'+kafe_logo+')');
var kafe_name = page.query.name;
$('#kafe_name').html(kafe_name);

    }
})