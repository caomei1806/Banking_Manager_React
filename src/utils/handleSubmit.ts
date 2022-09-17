import { FormType,Status, TransferType } from "../types/enums"
import { Error,User, AccountHolder } from "../types"
import {displayError, getErrorMessage, addDataErrorAttribute} from './displayErrors'
import {login} from '../services/authenticationServices'
import { validate } from "./validateForm"
import axios, { AxiosError } from "axios"
import { Navigate, useNavigate } from "react-router-dom"
const API_URL = 'http://localhost:5000/api/v1/account-holder'


type SubmitProps =  {
	formType: FormType,
	user: User,
	setUser?: (User: User) => void,
	errors: Error[] | null,
	setErrors?: (Error: Error[]) =>  void
	accountHolder?: AccountHolder,
}
type OptionalProps = {
	[key: string]: String | Number
}
const httpRequestError: Error = {
	message: {
		message: 'Invalid credentials',
		statusCode: Status.badRequest
	},
	DOMelement: null
}

const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>, submitProps: SubmitProps, optional?: OptionalProps) => {
		const {formType, user, setUser, errors, setErrors} = submitProps
		if(setErrors)
		setErrors([])
		e.preventDefault()
		let cred: Object = {}
		switch(formType){
			case FormType.loginForm:
				const {email, password} = user
				cred = {email, password}
				break;
			case FormType.accountSetupForm:
				console.log(e)
				break;
			default:
				break;
				
		}
			
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
			
			const message = value && validate(key, value)
			
			const inputElement = formElements[index] as HTMLInputElement
			console.log(inputElement)
			if (message && message.statusCode !== Status.success) {
				formErrors.push({ message: message, DOMelement: inputElement })
			}
		})
		if(setErrors)
		setErrors(formErrors)

			if (formErrors.length === 0) {
				console.log(errors)
				switch(formType){
					case FormType.loginForm:
						const a = await login(user.email, user.password)
						if(a instanceof AxiosError ){
							console.log("error occured")
							return httpRequestError;
						}
						break;
					case FormType.accountSetupForm:
						const {accountHolder} = submitProps
						console.log(accountHolder)
						axios.post(
						`${API_URL}/account-setup`,
						{
							fullname: accountHolder?.fullname,
							personalIDNo: accountHolder?.personalIDNo,
							address: `${accountHolder?.address.no} ${accountHolder?.address.street} \n ${accountHolder?.address.city}`
						},
						{withCredentials: true}
					)
						break;
					case FormType.createAccountForm:
						console.log(e.target)
						axios.post(
						`${API_URL}/create-bank-account`,
						{
							currency: optional?.curr
						},
						{withCredentials: true}
					)
						break;
					case FormType.tranferForm: 
						const transferType = optional?.transferType
						console.log('im here')
						switch(transferType){
							case TransferType.deposit:
								console.log('okay')
								axios.post(
								`http://localhost:5000/api/v1/account/${optional?.accountId}/transaction`,
								{
									transactionType: optional?.transferType,
									amount: optional?.amount,
								}, {withCredentials: true}
								)
								console.log('hello')
								break;
							case TransferType.withdraw:
								console.log('okay')
								axios.post(
								`http://localhost:5000/api/v1/account/${optional?.accountId}/transaction`,
								{
									transactionType: optional?.transferType,
									amount: optional?.amount as Number,
								}, {withCredentials: true}
								)
								break;
							case TransferType.transfer:
								console.log('okay')
								axios.post(
								`http://localhost:5000/api/v1/account/${optional?.accountId}/transaction`,
								{
									transactionType: optional?.transferType,
									amount: optional?.amount,
									receiverAccountNo: optional?.receiverAccountNo.toString().trim()

								}, {withCredentials: true})
								break;
						}
						break;
				}
				
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