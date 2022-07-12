import React, { useContext, useState, createContext } from 'react'
import { User, Error, AccountHolder } from './types'
import { Role, Status } from './types/enums'

interface AppContextInterface {
	user: User
	setUser: (User: User) => void
	accountHolder: AccountHolder
	setAccountHolder: (AccountHolder: AccountHolder) => void
	errors: Error[] | null
	setErrors: (Error: Error[]) => void
}
const defaultUser: User = {
	id: 0,
	name: '',
	email: '',
	password: '',
	role: Role.user,
}
const defaultAccountHolder: AccountHolder = {
	fullname: '',
	personalIDNo: '',
	address: {
		no: 0,
		street: '',
		city: '',
	},
	user: defaultUser,
}
const defaultError: Error = {
	message: {
		message: '',
		statusCode: Status.success,
	},
	DOMelement: null,
}
const defaultAppContext: AppContextInterface = {
	user: defaultUser,
	setUser: (user) => console.warn(`no user provided: ${user}`),
	accountHolder: defaultAccountHolder,
	setAccountHolder: (accountHolder) =>
		console.warn(`no user provided: ${accountHolder}`),
	errors: [defaultError],
	setErrors: (error) => console.warn(`no eroror provided: ${error}`),
}

const AppContext = createContext<AppContextInterface>(defaultAppContext)
const AppProvider = ({ children }: React.PropsWithChildren<unknown>) => {
	const [user, setUser] = useState<User>(defaultUser)
	const [accountHolder, setAccountHolder] =
		useState<AccountHolder>(defaultAccountHolder)
	const [errors, setErrors] = useState<Error[]>([])

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				accountHolder,
				setAccountHolder,
				errors,
				setErrors,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}
export { AppContext, AppProvider }
