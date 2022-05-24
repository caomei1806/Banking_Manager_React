import { FormType,Status } from "../types/enums"
import { Error,User } from "../types"
import {displayError, getErrorMessage, addDataErrorAttribute} from './displayErrors'
import {login} from '../services/authenticationServices'
import { validate } from "./validateForm"


const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>, formType: FormType, user: User, setUser: (User: User) => void, errors: Error[] | null, setErrors: (Error: Error[]) =>  void) => {

		setErrors([])
		e.preventDefault()
			const { email, password } = user
			const cred = { email, password }
			const credentials = Object.entries(cred)
		const formErrors: Error[] = []
		const form = e.currentTarget
		const formElements = form.elements as typeof form.elements & {
			email: { value: string }
			password: { value: string }
		}

		credentials.forEach((cred, index) => {
			const key = cred[0]
			const value = cred[1].toString()
			const message = validate(key, value)
			const inputElement = formElements[index] as HTMLInputElement
			console.log(inputElement)
			if (message.statusCode !== Status.success) {
				formErrors.push({ message: message, DOMelement: inputElement })
			}
		})
		setErrors(formErrors)

			if (formErrors.length === 0) {
				console.log(errors)
				login(user.email, user.password)
			} else {
				formErrors.forEach((error) => {
					const element = error.DOMelement as HTMLInputElement
					displayError(element)
					const elementMessage = getErrorMessage(element, formErrors)
					error.DOMelement?.parentElement?.setAttribute(
						'data-error',
						elementMessage ? elementMessage : ''
					)
					addDataErrorAttribute(element, elementMessage ? elementMessage : '')
				})
			}
		

	}
	export {handleSubmit}