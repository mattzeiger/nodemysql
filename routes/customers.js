var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {	
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM customer',function(err,rows) {			
	            if(err) {
	                console.log("Error Selecting : %s ",err );
				}
	            res.render('customers',{page_title:"Customers - Node.js",data:rows, status:req.query.status});

	         });
	    });	
});

router.all('/add', function(req, res, next) {	
	if (req.method == "POST") {		
		
		var input = JSON.parse(JSON.stringify(req.body));
		
		if (input.inputName) { //validate input						
			var data = {
				name: input.inputName,
				address: input.inputAddress,
				email: input.inputEmail,
				phone: input.inputPhone
			};
			
			if (input.inputID > 0) {
				//its an update
				console.log("Updating customer");
			} else {			
				//create a new customer record
				console.log("Creating a new customer");
				
				
				req.getConnection(function(err,connection){			
					
					var query = connection.query('INSERT INTO customer set ?', data, function(err,rows) {
						
						if (err) {
							console.log("Error Selecting : %s ",err );
						}
						
						res.redirect("/customers?status=created");												
					});
				});
				/**/
			}
		}
		//res.redirect("/customers?success=1");	
	} else {
		res.render('customers_edit');
	}
	
});



module.exports = router;