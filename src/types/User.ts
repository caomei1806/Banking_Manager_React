import {Role} from './enums/UserRole'
type User = {
	id: Number,
	name: String,
	email: String,
	password: String,
	role: Role
}

export default User;