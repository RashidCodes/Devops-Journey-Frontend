db.names.insert({name: 'Majith'})

db.createUser({
	user: 'babok',
	pwd: 'babok24',
	roles: [{
		role: 'readWrite',
		db: 'names'
	}]
})
