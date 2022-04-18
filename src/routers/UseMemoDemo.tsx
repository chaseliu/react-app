import React, { Fragment, useMemo, useState } from 'react'


function NoUseMemo() {
	const [counterOne, setCounterOne] = useState(0)
	const [counterTwo, setCounterTwo] = useState(0)

	const incrementOne = () => {
		setCounterOne(counterOne + 1)
	}

	const incrementTwo = () => {
		setCounterTwo(counterTwo + 1)
	}

	const isEven = () => {
		let i = 0
		while (i < 1000000000) i += 1
		return counterOne % 2 === 0
	}

	return (
		<div>
			<button
				onClick={incrementOne}
			>Count One = {counterOne}</button>
			<span>
				{
					isEven() ? 'even' : 'odd'
				}
			</span>
			<br />
			<button
				onClick={incrementTwo}
			>Count Two = {counterTwo}</button>
		</div>
	)
}


function UseMemo() {
	const [counterOne, setCounterOne] = useState(0)
	const [counterTwo, setCounterTwo] = useState(0)

	const incrementOne = () => {
		setCounterOne(counterOne + 1)
	}

	const incrementTwo = () => {
		setCounterTwo(counterTwo + 1)
	}

	const isEven = useMemo(() => {
		let i = 0
		while (i < 1000000000) i += 1
		return counterOne % 2 === 0
	}, [counterOne])

	return (
		<div>
			<button
				onClick={incrementOne}
			>Count One = {counterOne}</button>
			<span>
				{
					isEven ? 'even' : 'odd'
				}
			</span>
			<br />
			<button
				onClick={incrementTwo}
			>Count Two = {counterTwo}</button>
		</div>
	)
}


export default function UseMemoDemo() {
	return (
		<Fragment>
			<h2>No useMemo</h2>
			<NoUseMemo></NoUseMemo>
			<h2>useMemo</h2>
			<UseMemo></UseMemo>
		</Fragment>
	)
}