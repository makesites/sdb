// dependencies
var path = require("path"),
	fs = require("fs"),
	simpledb = require("simpledb");

var Exec = function( program ){

	this.program = program;
	//
	this.config();
	// find the right path
	//if (program.read) this.read();

}

Exec.prototype = {

	options: {

	},

	config: function(){
		var file = path.join(__dirname, "../", "config/path");
		var creds = {};

		if (this.program.config){
			var config_file = this.program.config;
			// open the config and save the new path
			var config = fs.openSync(file, "w");
			fs.writeSync(config, config_file, 0);

		} else {
			// load the config path
			var config_file = fs.readFileSync(file, "utf-8");
		}
		// either way load the config credentials
		if( !fs.existsSync(config_file) ){
			// create creds file
			fs.writeFileSync(config_file, ' ');
		} else {
			// load existing values
			creds = JSON.parse( fs.readFileSync(config_file, "utf-8") );
		}
		// save existing params
		if (this.program.key){
			creds.key = this.program.key;
		}
		if (this.program.secret){
			creds.secret = this.program.secret;
		}
		// save back to the file if we passed new values
		if (this.program.key || this.program.secret){
			fs.writeFileSync(config_file, JSON.stringify( creds ));
		}
		// save creds for later...
		this.creds = creds;
	},

	read : function( domain, options ){
		var sdb = new simpledb.SimpleDB({keyid: this.creds.key ,secret: this.creds.secret });

		var query = "";
		var fields = ( options.fields )? options.fields : "*";
		query += "select "+ fields +" from "+ domain;
		// add options
		if( options.order ){
			query += " order by "+ options.order;
		}
		if( options.query ){
			query += " where "+ options.query;
		}
		if( options.item ){
			query += " where itemName()='"+ options.item +"'";
		}
		if( options.limit ){
			query += " limit "+ options.limit;
		}
		sdb.select( query, function( error, result ) {
			console.log( JSON.stringify( result ) );
		});

	}
}

module.exports = function( program ){

	return new Exec( program );

}