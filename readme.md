## SDB

CLI for SimpleDB written in Node.js


## Install

To install the node module as a globally accessible executable:

```
npm install node-sdb -g
```


## Usage

You'll need to create a configuration file at ~/.sdb (or any other location manually set) containing your AWS credentials.

```
// set the credentials (only once)
sdb --key ASDVBTEAWRFVFH
sdb --secret 23J35RIU4F9RE89W8WJ3EIO3KJK4545DS

// read
sdb read [options] [domain] > output.json
```


## Actions

* Read

Write & Delete actions may be supported in the future. Feel free to add them.

Note that these actions need to be enabled by the user's policy in AWS for the credentials you are using. Otherwise you'll just get an error response.


## Options

These are the flags you can enter in any command

### Read

* ***-a*** or ***--all*** : select all items on the domain (optional)
* ***-i*** or ***--item*** : select one item by id
* ***-f*** or ***--fields*** : pick only selected fields
* ***-l*** or ***--limit*** : apply a limit to the returned items
* ***-q*** or ***--query*** : set conditions for the returned items
* ***-o*** or ***--order*** : select a field to order the results by


## Credits

Created by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)
