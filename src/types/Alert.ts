import { AlertType } from "./enums"
import Message from "./Message"

type Alert = {
	message: Message,
	alertType: AlertType
}
export default Alert