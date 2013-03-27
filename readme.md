## SDB

CLI for SimpleDB written in Node.js


## Install

To install the node module as a globally accessible executable: 

```
npm install node-sdb -g
```

You'll need to add a configuration file at ~/.sdb (or any other location manually set) containing your AWS credentials.  


## Usage
``` 
sdb {{action}} {{domain}} {{target}} {{options}}
```

## Actions

* Read
* Write
* Delete

Note that these actions need to be enabled by the user's policy in AWS for the credentials you are using. Otherwise you'll just get an error response. 


## Options

These are the flags you can enter in any command

* ***-a*** or ***--all*** : applies to every record on the specified domain


## Credits

Created by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)
