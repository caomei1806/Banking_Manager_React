export enum Status {
	emptyString = "emptyString",
	invalid = "invalid",
	success = "success",
	badRequest = "badRequest"
}
type Message = {
	message: String,
	statusCode: Status | null
}
export default Message