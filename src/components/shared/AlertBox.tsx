import React, { forwardRef } from 'react'
import { Alert } from '../../types'
import { BsFillChatSquareDotsFill } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import '../../styles/Alert.scss'

interface AlertProps {
	alertContent: Alert
}
const AlertBox = forwardRef<HTMLDivElement, AlertProps>(
	({ alertContent }: AlertProps, ref) => {
		const closeComponent = (e: React.MouseEvent<HTMLElement>) => {
			const parentElement = e.currentTarget.parentElement
			parentElement?.classList.add('hide')
			const removeAlert = setInterval(() => {
				parentElement?.remove()
			}, 2000)
		}
		return (
			<figure
				className={`alert alert-${alertContent.alertType} hide`}
				ref={ref}
			>
				<figcaption>
					<BsFillChatSquareDotsFill />
				</figcaption>
				<p>{alertContent.message.message}</p>
				<aside
					className='button button-close'
					onClick={(e) => closeComponent(e)}
				>
					<GrClose />
				</aside>
			</figure>
		)
	}
)

export default AlertBox
