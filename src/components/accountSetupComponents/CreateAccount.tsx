import React, { useRef, useState } from 'react'
import { useGlobalContext } from '../../context'
import { FormType, Status } from '../../types/enums'
import { AccountCurrency } from '../../types/enums/AccountCurrency'
import { generateAlert } from '../../utils/generateAlert'
import { useForm } from '../../utils/hooks/useForm'
import AlertBox from '../shared/AlertBox'

const CreateAccount = () => {
	const { user, errors, setErrors } = useGlobalContext()
	const { handleChange, handleSubmit } = useForm()
	const alertRef = useRef<HTMLDivElement>(null)
	const [currency, setCurrency] = useState<String>()

	const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		const formType = FormType.createAccountForm
		console.log(document.cookie)
		const httpResult = await handleSubmit(
			e,
			{
				formType,
				user,
				errors,
				setErrors,
			},
			{ curr: currency as String }
		)
		alertRef.current?.classList.remove('hide')
		if (httpResult?.message.statusCode === Status.badRequest) {
			setErrors([httpResult])
		} else {
			// navigate('/account-holder/account-setup')
		}
	}
	return (
		<div className='form-subpage '>
			<form className='userForm account-setup' onSubmit={handleSave}>
				<h2 className='form-title'>Create account</h2>
				<div className='form-group'>
					<div className='form-control'>
						<label htmlFor='personalIDNo'>Personal ID Number</label>
						<select
							name='currency'
							id='currency'
							onChange={(e) => {
								const curr = e.target.value as AccountCurrency
								setCurrency(curr)
							}}
						>
							<option value={AccountCurrency.pln}>{AccountCurrency.pln}</option>
							<option value={AccountCurrency.eur}>{AccountCurrency.eur}</option>
							<option value={AccountCurrency.usd}>{AccountCurrency.usd}</option>
							<option value={AccountCurrency.gbp}>{AccountCurrency.gbp}</option>
						</select>
					</div>

					<div className='form-control'>
						<input type='submit' value='save' className='btn-submit' />
					</div>
					<AlertBox alertContent={generateAlert(errors)} ref={alertRef} />
				</div>
			</form>
		</div>
	)
}

export default CreateAccount
