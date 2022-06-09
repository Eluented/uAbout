import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../Marginer";
import style from "styled-components"
import httpClient from '../../httpClient'
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [formData, setFormData] = useState({});

  function handleSubmit(e) {
    return e.preventDefault();
  }
  const setData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const registerUser = async () => {

    try {
      const resp = await httpClient.post("https://uabout.herokuapp.com/api/register", formData)
      if (resp.data.error){

      } else {
        navigate("/home");
      }
      console.log(resp.data)
    } catch (e) {
      console.log(e)
    }

  }

    return (
      <BoxContainer>
        <FormContainer onSubmit={handleSubmit}>
          <Input type="text" placeholder="First Name" label="First Name" name='first_name' onChange={(e) => setData(e)}/>
          <Input type="text" placeholder = "Last Name" label="Last Name" name='last_name' onChange={(e) => setData(e)} />
          <Input type="text" placeholder = "Username" label="Username"  name='username' required onChange={(e) => setData(e)} />
          <Input type="email" placeholder = "Email" label="Email" name='email' required onChange={(e) => setData(e)}/>
          <Input type="password" placeholder = "Password" label="Password" name='password' required onChange={(e) => setData(e)} />
          <Input type="number" placeholder = "Phone Number" label="Phone Number" name = "phone_number" onChange={(e) => setData(e)} />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit" onClick={registerUser}>Register</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink href="#">
          Already have an account?
          <BoldLink href="#" onClick={switchToSignin}>
            Signin
          </BoldLink>
        </MutedLink>
      </BoxContainer>
    );
}
