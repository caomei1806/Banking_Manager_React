export enum Role {
	user,
	admin
}
type User = {
	id: Number,
	name: String,
	email: String,
	password: String,
	role: Role
}

export default User;