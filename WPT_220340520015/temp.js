const url=" ";
const dbpar={
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'test',
	port:3306
};
const mysql=require('mysql2');
const con=mysql.createConnection(dbpar);
console.log("Database connecting");
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.post('/update', function (req, res) {
	  let Bookid=req.query.Bookid;
	  let Bookname=req.query.Bookname;
	   let price=req.query.price;
	
		console.log(Bookid,Bookname,price);
		let output={status:false}
		con.query('update Book set price=? where Bookid=?',[Bookid],(err,rows)=>{
			if(err){
				console.log('Error'+err);
			}
			else{
				if(rows.affectedRows>0){
					console.log(rows.affectedRows);
					output.status=true;
				}
			}
			res.send(output);
		});
		
    	
    });


app.get('/getalldetails', function (req, res) {
    
	
       con.query('select * from Book',[],(err,rows)=>{
		res.send(rows);
	   });

		

		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});