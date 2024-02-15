import bcrypt from 'bcryptjs';

const users = [
	{
		name: "Valeria",
		email: "kan.valeria1309@gmail.com",
		password: bcrypt.hashSync("alisa981", 10),
		isAdmin: true,
		isEditor: true,
	},
	{
		name: "Allushka",
		email: "tkachenkoalluska@gmail.com",
		password: bcrypt.hashSync("cake24", 10),
		isAdmin: false,
		isEditor: true,
	},
	{
		name: "Mary Poppins",
		email: "mary@email.com",
		password: bcrypt.hashSync("qaz123", 10),
		isAdmin: false,
		isEditor: false,
	},
];

export default users;