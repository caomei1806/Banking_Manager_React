import {Address, User} from './'
type AccountHolder = {
	fullname: String,
	personalIDNo: String,
	address: Address,
	user?: User
}

export default AccountHolder;