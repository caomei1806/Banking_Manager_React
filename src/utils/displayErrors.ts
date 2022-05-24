import { Error } from "../types"
const getErrorMessage = (element: HTMLInputElement, errors : Error[]) => {
		const elementError = errors.map((error) => {
			if (error.DOMelement === element) {
				return error.message.message.toString()
			}
		})
		return elementError[0]
	}

	const displayError = (element: HTMLInputElement) => {
		element.classList.add('error')
		element.parentElement?.classList.add('error')
	}
	const addDataErrorAttribute = (
		element: HTMLInputElement,
		elementMessage: string
	) => {
		element.parentElement?.setAttribute('data-error', elementMessage)
	}

export {getErrorMessage,displayError,addDataErrorAttribute}