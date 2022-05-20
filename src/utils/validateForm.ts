import Message, {Status} from '../types/Message'

const isValueEmpty = (value: String) => {
	if(value === ""){
		return true
	}
	return false
}
const validate = (key: string,value: string) : Message => {
	switch(key){
		case 'email':
			const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			const valueEmpty = isValueEmpty(value)
			const validate = emailRegex.test(value)
			console.log(validate)
			if(valueEmpty){
				const emptyValueMessage: Message = {
					message: "please provide email",
					statusCode: Status.emptyString
				} 
				return emptyValueMessage
			}
			if(!validate){
				const invalidValidationMessage: Message = {
					message: "please provide valid email",
					statusCode: Status.invalid
				}
				return invalidValidationMessage
			}
			if(validate){
				const successMessage = {
					message: "valid input",
					statusCode: Status.success
				}
				return successMessage
			}
			return {
				message: "please provide valid email",
				statusCode: Status.badRequest
			}
		case 'password':
			if(value.length < 8){
				const invalidLengthMessage = {
				message: "password must consist of at least 8 characters",
				statusCode: Status.invalid
			}
			return invalidLengthMessage;
			}
			else{
				const successMessage = {
					message: "valid input",
					statusCode: Status.success
				}
				return successMessage
			}
			
		default:
			const somethinkWentWrondMessage = {
				message: "please provide valid password",
				statusCode: Status.badRequest
			}
			return somethinkWentWrondMessage
	}
}
export {validate}