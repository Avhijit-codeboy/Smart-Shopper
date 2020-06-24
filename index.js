let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
app.use(express.static(__dirname+'/public'));
app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized:true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname+'/landing.html'));
});
app.post('/customer',(req,res)=>{
	res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/customerPage',(req,res)=>{
	let username = req.body.username;
	req.session.loggedin = true;
	req.session.username = username;
	res.sendFile(path.join(__dirname+'/customer.html'));
});
app.post('/shopkeeper',(req,res)=>{
	res.sendFile(path.join(__dirname+'/storeowner.html'));
});
app.listen(3000);