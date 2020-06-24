let request = document.getElementById('requests');

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

function abc1(){
 	const reqref = db.collection('Grocery').doc('Requests');
 	reqref.get().then(function(doc){
 		if(doc.exists){
 			let li = document.createElement('LI');
 			let text = document.createTextNode(doc.data().msg);
 			li.appendChild(text);
 			request.appendChild(li);
 		}
 		else{
 			console.log("No data");
 		}
 	}).catch(function(error){
 		console.err(error);
 	});
 }
function load(){
	setTimeout(abc1,1000);
}