import { Redirect } from 'react-router';
import styled from 'styled-components/macro';

const FormBox = styled.div`
    width: 40%;
    margin: auto;
    padding: 2% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 20px;
`;

const FormTitle = styled.h1`
    font-weight: 500;
`;

const FormData = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const LabelInput = styled.label`
    font-size: 1.5em;
    width: 70%;
    text-align: left;
    margin-top: 5%;
`;

const Input = styled.input`
    width: 70%;
    border-radius: 20px;
    border: 1px solid #000;
    padding: 2%;
    margin: 2% 0;
    cursor: pointer;
`;

const SendBtn = styled.input`
    width: 40%;
    font-size: 1.5em;
    font-weight: 700;
    border-radius: 20px;
    border: 1px solid #000;
    background-color: #fff;
    padding: 2%;
    margin: 3% 0;
    cursor: pointer;
    :hover {
        background-color: #000;
        color: #fff;
        border: 1px solid #fff;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

export const Login = (props) => {
    const { handleSubmit, handleEmail, handlePassword, invalidInput, emptyInput } = props;
    const isLogged = window.localStorage.getItem('isAuthorized');
    if(isLogged === 'true') {
        return <Redirect to='/' />
    }
    return (

        <>
                <FormBox>

                    <FormTitle>LOGIN</FormTitle>
                    {emptyInput && <ErrorMessage> Inputs cannot be empty! </ErrorMessage>}
                    {invalidInput && <ErrorMessage> Invalid email or password </ErrorMessage>}
                    
                    <FormData onSubmit={handleSubmit}>

                        <LabelInput>Email</LabelInput>
                        <Input type="text" placeholder="Type your email here..." onChange={handleEmail} />

                        <LabelInput>Password</LabelInput>
                        <Input type="password" placeholder="Type your password here..." onChange={handlePassword} />

                        <SendBtn type="submit" value="SUBMIT" />

                    </FormData>

                </FormBox>
            
        </>
    )
}