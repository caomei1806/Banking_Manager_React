import React from 'react'
import SloganContent from '../../types/SloganContent'
type Props = {
	slogan: SloganContent
}
const Slogan = (props: Props) => {
	const showURL = () => {
		console.log(`../../public/img/${props.slogan.imageURL}`)
	}
	showURL()
	return (
		<aside className='slogan-content'>
			<svg viewBox='0 0 100 100' preserveAspectRatio='none'>
				<polygon points='0,100 100,0 100,100' />
			</svg>
			<section className='background'></section>
			<h1>{props.slogan.title}</h1>
			<p>{props.slogan.description}</p>
			{props.slogan.quote && <q>{props.slogan.quote}</q>}

			{props.slogan.imageURL && <img src={`/img/fundsManagment.png`} />}
		</aside>
	)
}

export default Slogan