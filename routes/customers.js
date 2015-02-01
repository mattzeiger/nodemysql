var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {	
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM customer',function(err,rows) {			
	            if(err) {
	                console.log("Error Selecting : %s ",err );
				}

	            res.render('customers',{page_title:"Customers - Node.js",data:rows,testing:'heyos'});

	         });
	    });	
});

router.all('/add', function(req, res, next) {
	if (req.method == "POST") {
		var input = JSON.parse(JSON.stringify(req.body));
		if (input.inputName) {
			console.log(input.inputName);
		}
	}
	
	res.render('customers_edit', {hold:input});
	
});



module.exports = router;