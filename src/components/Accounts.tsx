import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AccountCurrency } from '../types/enums/AccountCurrency'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
const API_URL = 'http://localhost:5000/api/v1/account-holder'

type Account = {
	accountNo: String
	currency: AccountCurrency
	balance: Number
	_id?: String
}
const Accounts = () => {
	const [accounts, setAccounts] = useState<Account[]>([])
	const { user, errors, setErrors } = useGlobalContext()
	useEffect(() => {
		let accountHolder
		axios
			.get(`${API_URL}/show-me`, { withCredentials: true })
			.then((holder) => {
				console.log(holder.data.currentHolder.id)
				accountHolder = holder.data.currentHolder.id
				axios
					.get(`${API_URL}/${accountHolder}`, {
						withCredentials: true,
					})
					.then((res) => {
						console.log(res.data.accountHolder.accounts)
						const allAccounts = res.data.accountHolder
							.accounts as Array<Account>
						let accountList: Account[] = []
						allAccounts?.map((acc) => {
							console.log(acc)
							accountList.push({
								accountNo: acc.accountNo,
								currency: acc.currency,
								balance: acc.balance,
								_id: acc._id,
							})
						})
						setAccounts(accountList)
					})
			})

		console.log(user)
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				padding: '2em',
				justifyContent: 'space-evenly',
			}}
		>
			{accounts.length !== 0 &&
				accounts?.map((account) => {
					return (
						<div
							key={`${account.accountNo}`}
							style={{
								padding: '2em',
								backgroundColor: '#e3e3e3',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<h5>
								Account no.: <span>{account.accountNo}</span>
							</h5>
							<h4 style={{ display: 'flex', gap: '3em', alignItems: 'center' }}>
								Balance:{' '}
								<span
									style={{ fontSize: '1.5em' }}
								>{`${account.balance} ${account.currency}`}</span>
							</h4>
							<Link
								to={`/account-holder/${account._id}/transaction`}
								className='navLink'
								style={{ all: 'unset', alignSelf: 'center' }}
							>
								<button
									style={{
										padding: '1.5em',
										textTransform: 'uppercase',
										cursor: 'pointer',
										marginTop: '2em',
										fontWeight: 'bold',
										color: 'white',
										backgroundColor: 'rgb(255, 0, 157)',
									}}
								>
									Make transfer
								</button>
							</Link>
						</div>
					)
				})}
		</div>
	)
}

export default Accounts
