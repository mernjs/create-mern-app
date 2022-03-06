import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  	body {
		margin: 0;
		padding: 0;
		background: ${props => props.theme.colors.bgColor};
	}
    
  	* {
		font-family: "Montserrat";
		font-display: swap; 
	}

	a{
        cursor: pointer;
        color: ${props => props.theme.colors.primaryColor};
        font-size: 18px;
        font-weight: 500;
        letter-spacing: .1px;
        line-height: 25px;
        padding: 0;
        text-decoration: none;
        &:hover{
            text-decoration:none;
            color: ${props => props.theme.colors.textColor};;
        }
    }
`

export default GlobalStyles