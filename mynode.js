sql = require("mssql");
console.log("hello world");
var result;
//alert("hello");
function getNow()
{
	currentDate=new Date();
	return currentDate.getDate()+ "/" + currentDate.getMonth()+ "/" +currentDate.getFullYear() + "  "+
	currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
}
function getBuffer(res)
{
sql.connect("mssql://test2:test@10.21.4.5/arcgis").then(function() {
	// Query
	console.log("Connected");
		
	new sql.Request().query('select * from Google_AccBuffer').then(function(recordset) {
		result=recordset;		
		//console.dir(recordset);
		currentDate=new Date();
		console.log("Buffer @ "+getNow())
		res.json(result);
	})
}).catch(function(err) {
	console.log("error")
});
}

function getATMs(res)
{
sql.connect("mssql://test2:test@10.21.4.5/arcgis").then(function() {
	// Query
	console.log("Connected");
		
	new sql.Request().query(
		'select ID,Place_ID,Place_Name,Is_Bank,Address as atm_address,Lat,lng from Google_Places')
		.then(function(recordset) {
		result=recordset;		
		console.log("ATMs @ "+getNow())
		res.json(result);
	})
}).catch(function(err) {
	console.log("error")
});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','jade');
app.use('/public',express.static(__dirname+ '/public'));


var port = 4242; //process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/', function(req, res) {
  //  res.json({ message: 'hooray! welcome to our api!' });   
//});
router.route('/test').get(function(req, res) {
    res.json({ message: 'Hello world!' });   
});
router.route('/buffer').get(function(req,res){
	getBuffer(res);
 //res.json(bufferJSON);
});
router.route('/atm').get(function(req,res){
	getATMs(res);
});
router.route('/test2').get(function (req,res) {
    res.render('test',{name:"Mohamed"})
})


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);