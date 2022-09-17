import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { FormType } from '../types/enums'
import { handleSubmit } from '../utils/handleSubmit'
import { useForm } from '../utils/hooks/useForm'
import '../styles/Form.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { TransferType } from '../types/enums/TransferType'

const Transfer = () => {
	const { user, errors, setErrors } = useGlobalContext()
	const { handleSubmit } = useForm()
	const [amount, setAmount] = useState<Number>(0)
	const [transferType, setTransferType] = useState<TransferType>(
		TransferType.deposit
	)
	const [receiver, setReceiver] = useState<String>()
	let { id } = useParams()
	const navigate = useNavigate()

	const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		const formType = FormType.tranferForm
		console.log(transferType)
		const httpResult = await handleSubmit(
			e,
			{
				formType,
				user,
				errors,
				setErrors,
			},
			{
				accountId: id as String,
				transferType: transferType as String,
				amount: amount,
				receiverAccountNo: receiver as String,
			}
		)
	}
	return (
		<div>
			<form className='userForm account-setup' onSubmit={handleSave}>
				<h2 className='form-title'>Simple transactions</h2>
				<div className='form-group' style={{ marginTop: '3em' }}>
					<div className='form-control'>
						<label htmlFor='transactionType'>Transaction type</label>

						<select
							name='transactionType'
							id='transactionType'
							className='input'
							style={{
								appearance: 'none',
								padding: '1em',
								border: '1px solid',
								outline: '1px solid gray',
								textShadow: '0 0 0 #000',
							}}
							onChange={(e) => setTransferType(e.target.value as TransferType)}
						>
							<option value={TransferType.deposit}>
								{TransferType.deposit}
							</option>
							<option value={TransferType.withdraw}>
								{TransferType.withdraw}
							</option>
							<option value={TransferType.transfer}>
								{TransferType.transfer}
							</option>
						</select>
					</div>
					<div className='form-control'>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							name='amount'
							className='input'
							onChange={(e) => {
								setAmount(parseInt(e.target.value))
							}}
						/>
					</div>
					{transferType === TransferType.transfer && (
						<div className='form-control'>
							<label htmlFor='receiverAccountNo'>Receiver account no</label>
							<input
								type='text'
								id='receiverAccountNo'
								name='receiverAccountNo'
								className='input'
								onChange={(e) => {
									setReceiver(e.target.value)
								}}
							/>
						</div>
					)}
					<div className='form-control'>
						<input
							type='submit'
							value='make transaction'
							className='btn-submit'
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Transfer
