import React, { Fragment, useCallback, useState } from 'react'

const Title = React.memo(function (props: { children: string }) {
	console.log('Rendering Title');
	return (
		<h2>{props.children}</h2>
	);
});

const Count = React.memo(function (props: { text: string, count: number }) {
	console.log(`Rendering ${props.text}`);
	return (
		<div>{props.text} - {props.count}</div>
	);
});

const Button = React.memo(function (props: { handleClick: () => void, children: string }) {
	console.log('Rendering button', props.children);
	return (
		<button onClick={props.handleClick}>
			{props.children}
		</button>
	);
});


export default function UseCallbackDemo() {
	const [age, setAge] = useState(29)
	const [salary, setSalary] = useState(50000)
	const incrementAge = useCallback(() => { setAge(age + 1) }, [age]);
	const incrementSalary = useCallback(() => { setSalary(salary + 1000) }, [salary]);
	return (
		<Fragment>
			<Title>useCallback Demo</Title>
			<Count text="Age" count={age} />
			<Button handleClick={incrementAge}>Increment age</Button>
			<Count text="Salary" count={salary} />
			<Button handleClick={incrementSalary}>Increment salary</Button>
		</Fragment>
	)
}