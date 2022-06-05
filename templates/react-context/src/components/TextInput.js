import React from 'react'
import styled from "styled-components";

export default (props) => {
	let { input, label, type, placeholder, error} = props
	return <TextInput>
		{label && <label>{label}</label> }
		<input {...input} placeholder={placeholder} className="text-input" type={type} />
		{error && <span className="error_show">{error}</span>}
	</TextInput>
}

const TextInput = styled.div`
	margin-bottom: 16px;
	.text-input{
		padding: 5px 15px;
		height: 40px;
		width: 92%;
		border: 1px solid rgb(238, 236, 236);
		border-radius: 28px;
		background-color: rgb(255, 255, 255);
		color: rgb(33, 33, 33);
		font-size: 14px;
		letter-spacing: 0px;
		line-height: 28px;
		background-clip: padding-box;
		font-weight:400;
		display:block;
		&::placeholder {
			color: #b9b8b8;
			opacity: 1;
		}
	}
	.error_show{
		font-size:12px;
		color:#d92020;
	}
	
`;