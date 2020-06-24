let input = document.querySelector('#m');
let but = document.querySelector('#but');
let mymap;
let popupContent="Hello";
mymap = L.map('mapid').setView([0,0], 13);

const popup = L.popup().setLatLng([0,0]).setContent(popupContent);
L.marker([0,0]).addTo(mymap).bindPopup(popupContent).openPopup();
const attribution = '&copy;<a href = "https://www.openstreetmap.org/copyright">OpenStreetMap'
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL,{attribution});
tiles.addTo(mymap);
 
 const firebaseConfig = {
    apiKey: "$Your_Firebase_Token",
    authDomain: "smart-shopper-92b6d.firebaseapp.com",
    databaseURL: "https://smart-shopper-92b6d.firebaseio.com",
    projectId: "smart-shopper-92b6d",
    storageBucket: "smart-shopper-92b6d.appspot.com",
    messagingSenderId: "651849033068",
    appId: "1:651849033068:web:969d100ecc21351c52ff49",
    measurementId: "G-FK3RET326L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  let db = firebase.firestore();

function clickMe(){
	let li = document.createElement('LI');
	let text = document.createTextNode(input.value);
	const q = encodeURIComponent(input.value);
	const uri = 'https://api.wit.ai/message?q=' + q;
	const auth = 'Bearer  $your_token';
	li.appendChild(text);
	document.getElementById("messages").appendChild(li);
	input.value="";
	abc(uri,auth);
}
but.addEventListener("click",clickMe);



let getLocation = () =>{
  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    
  }
}
let showPosition = (position)=>{
let popupContent = "You are here";
let lat = position.coords.latitude;
let long = position.coords.longitude;
L.marker([lat,long]).addTo(mymap).bindPopup(popupContent).openPopup();
}
let addInfoToMap = (latlongname)=>{
	for(let i=0;i<latlongname.length;i++){
 L.marker([latlongname[i][1],latlongname[i][2]]).bindPopup(latlongname[i][0]).addTo(mymap);
}
}
async function abc(uri,auth){
let storeLocs = [];
const a = await fetch(uri, {headers: {Authorization: auth}});
const data = await a.json();
if(data.intents[0].name=='grocery'){
let li1 = document.createElement('LI');
let ans = document.createTextNode("Grocery stores within 10km radius are shown on the map.Choose the one that suits you requirements.")
li1.appendChild(ans);
document.querySelector("#messages").appendChild(li1);
let yes = document.createElement('BUTTON');
yes.innerHTML = "Yes";
yes.addEventListener("click",dbStorage(data.text));
document.querySelector("#messages").appendChild(yes);
let storeRef = db.collection('Grocery');
let getDoc = storeRef.get()
  .then(snapshot=>{
  	snapshot.forEach(doc=>{
  		console.log(doc.data().Location.Rc);
  		storeLocs.push([doc.data().Name,doc.data().Location.Rc,doc.data().Location.Ac]);
  	});
  });
addInfoToMap(storeLocs);
}
}
function dbStorage(data){
  db.collection('Grocery').doc('Requests').set({
    msg:data,
    serviced:false,
  },{merge:true})
  .then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

