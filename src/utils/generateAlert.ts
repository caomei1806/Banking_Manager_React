import { Alert,Error } from "../types"
import { AlertType, Status } from "../types/enums"
const generateAlert = (errors: Error[] | null): Alert => {
		const errorsCount = errors?.length ? errors.length : 0
		if (errorsCount > 0) {
			const alert: Alert = {
				message: {
					message: 'Please provide valid credentials',
					statusCode: Status.invalid,
				},
				alertType: AlertType.error,
			}
			return alert
		} else {
			const alert: Alert = {
				message: {
					message: 'Success!',
					statusCode: Status.success,
				},
				alertType: AlertType.success,
			}
			return alert
		}
	}
export {generateAlert}