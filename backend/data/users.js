import bcrypt from 'bcryptjs';

const users = [
	{
		name: "Admin Lera",
		email: "kan.valeria1309@gmail.com",
		password: bcrypt.hashSync("admin23", 10),
		isAdmin: true,
	},
	{
		name: "Alla Tkachenko",
		email: "tkachenkoalluska@gmail.com",
		password: bcrypt.hashSync("cake23", 10),
		isAdmin: true,
	},
	{
		name: "Mary Poppins",
		email: "mary@email.com",
		password: bcrypt.hashSync("qaz123", 10),
		isAdmin: false,
	},
];

export default users;