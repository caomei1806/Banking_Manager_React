import React, { useRef, useState } from 'react'
import AlertBox from '../shared/AlertBox'
import '../../styles/Form.scss'
import { useForm } from '../../utils/hooks/useForm'
import { generateAlert } from '../../utils/generateAlert'
import { FormType, Status, AlertType } from '../../types/enums'
import { Address, Alert, Fullname } from '../../types'
import { useGlobalContext } from '../../context'

const AccountSetupForm = () => {
	const { user, errors, setErrors } = useGlobalContext()
	const { handleChange, handleSubmit } = useForm()
	const alertRef = useRef<HTMLDivElement>(null)
	const [fullname, setFullname] = useState<Fullname>({ name: '', surname: '' })
	const [address, setAddress] = useState<Address>({
		no: 0,
		street: '',
		city: '',
	})

	const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		const formType = FormType.accountSetupForm
		const httpResult = await handleSubmit(e, {
			formType,
			user,
			errors,
			setErrors,
		})
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
				<h2 className='form-title'>Account Holder Setup</h2>
				<div className='form-group'>
					<div className='form-control children-flex-row'>
						<div className='form-control-chunk'>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								id='name'
								name='name'
								className='input'
								onChange={(e) =>
									setFullname({ ...fullname, name: e.target.value })
								}
							/>
						</div>
						<div className='form-control-chunk'>
							<label htmlFor='surname'>Surname</label>
							<input
								type='text'
								id='surname'
								name='surname'
								className='input'
								onChange={(e) =>
									setFullname({ ...fullname, name: e.target.value })
								}
							/>
						</div>
					</div>
					<div className='form-control'>
						<label htmlFor='personalIDNo'>Personal ID Number</label>
						<input
							type='text'
							id='personalIDNo'
							name='personalIDNo'
							className='input'
							onChange={(e) => handleChange(e, FormType.accountSetupForm)}
						/>
					</div>
					<div className='form-control children-flex-row'>
						<div className='form-control-chunk'>
							<label htmlFor='addressStreet' data-address='Adress'>
								Street
							</label>
							<input
								type='text'
								id='addressStreet'
								name='addressStreet'
								className='input'
								onChange={(e) =>
									setAddress({ ...address, street: e.target.value })
								}
							/>
						</div>
						<div className='form-control-chunk'>
							<label htmlFor='addressNo' data-address='Adress'>
								House number
							</label>
							<input
								type='text'
								id='addressNo'
								name='addressNo'
								className='input'
								onChange={(e) => setAddress({ ...address, no: e.target.value })}
							/>
						</div>
					</div>
					<div className='form-control'>
						<label htmlFor='addressCity' data-address='Adress'>
							City
						</label>
						<input
							type='text'
							id='addressCity'
							name='addressCity'
							className='input'
							onChange={(e) => setAddress({ ...address, city: e.target.value })}
						/>
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

export default AccountSetupForm
