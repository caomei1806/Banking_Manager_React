import React, { useContext, useState, createContext } from 'react'
import { User, Error } from './types'
import { Role, Status } from './types/enums'

interface AppContextInterface {
	user: User
	setUser: (User: User) => void
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
	errors: [defaultError],
	setErrors: (error) => console.warn(`no eroror provided: ${error}`),
}

const AppContext = createContext<AppContextInterface>(defaultAppContext)
const AppProvider = ({ children }: React.PropsWithChildren<unknown>) => {
	const [user, setUser] = useState<User>(defaultUser)
	const [errors, setErrors] = useState<Error[]>([])

	return (
		<AppContext.Provider value={{ user, setUser, errors, setErrors }}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}
export { AppContext, AppProvider }
