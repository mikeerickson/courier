# Courier

## Description

Courier is a simple CLI tool which works as an alias to npm. When active, courier will check if project is already using `yarn` ( via existence of `yarn.lock`) and confirm with user to continue with npm installation.

## Usage

1. Create bash alias (place it wherever you wish such as `.bash_profile`, `.zshrc`, etc.

	```bash
	alias npm="courier"
	```

2. Execute `npm` as you normally would and let the magic happen

	```bash
	❯ npm i -D test      
	? ⚠️  This project has been configured to use yarn
	Are you sure you wish to use npm? (Y/n) › false
	```

### License

Copyright &copy; 2019 Mike Erickson
Released under the MIT license

### Credits

Courier written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.io](http://codedungeon.io)
