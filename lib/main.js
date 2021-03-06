// dependencies
var path = require("path"),
	fs = require("fs"),
	util = require('util'),
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
		// defaults
		var creds = {
			region: "sdb.amazonaws.com"
		};
		var file;

		if (this.program.config){
			file = this.program.config;
			var conf = path.join(__dirname, "../", "config/path");
			// open the config and save the new path
			var fsocket = fs.openSync(conf, "w");
			fs.writeSync(fsocket, file, 0);
		} else {
			// get existing setup
			file = getConfig();
		}

		// either way load the config credentials
		if( !fs.existsSync(file) ){
			// create creds file
			fs.writeFileSync(file, JSON.stringify( creds ));
		} else {
			// load existing values
			creds = JSON.parse( fs.readFileSync(file, "utf-8") );
		}
		// save existing params
		if (this.program.key){
			creds.key = this.program.key;
		}
		if (this.program.secret){
			creds.secret = this.program.secret;
		}
		if (this.program.region){
			creds.region = this.program.region;
		}
		// save back to the file if we passed new values
		if (this.program.key || this.program.secret || this.program.region){
			fs.writeFileSync(file, JSON.stringify( creds ));
		}
		// save creds for later...
		this.creds = creds;
	},

	domain : function( domain, options ){
		var sdb = new simpledb.SimpleDB({keyid: this.creds.key ,secret: this.creds.secret, host: this.creds.region, nolimit: true });

		if( options.list ){
			// read the domain list instead
			return sdb.listDomains(function( error, result ) {
				if( error ) return console.log( error );
				output( result );
			});
		}

	},

	read : function( domain, options ){
		// fallbacks
		options = options || {};
		var nolimit = ( (typeof options.limit !="undefined") && ( options.limit == 0 || options.limit == 2500 )  ) ? true : false;
		var sdb = new simpledb.SimpleDB({keyid: this.creds.key ,secret: this.creds.secret, host: this.creds.region, nolimit: nolimit });

		if( domain == "*" ){
			// read the domain list instead
			return sdb.listDomains(function( error, result ) {
				if( error ) return console.log( error );
				output( result );
			});
		}
		var query = "";
		var fields = ( options.fields )? options.fields : "*";
		query += "select "+ fields +" from "+ domain;
		// add options
		if( options.query ){
			query += " where "+ options.query;
		}
		if( options.item ){
			query += " where itemName()='"+ options.item +"'";
		}
		if( options.order ){
			query += " order by "+ options.order;
		}
		if( options.limit && options.limit != 0 ){
			query += " limit "+ options.limit;
		}
		sdb.select( query, function( error, result ) {
			if( error ) return console.log( error );
			output( result );
		});

	}
}

// Helpers
function output( obj ){
	return console.log(JSON.stringify(obj));
	//return console.log( util.inspect(obj, false, null) );
}

function homeDir() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getConfig(){
	var config = path.join(__dirname, "../", "config/path");
	// load the config file
	var file = fs.readFileSync(config, "utf-8");
	var home = homeDir( file );
	// FIX : replace home dir
	file = file.replace("~", home);
	return file;
}

module.exports = function( program ){

	return new Exec( program );

}
