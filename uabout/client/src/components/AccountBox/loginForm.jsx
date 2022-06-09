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
import httpClient from "../../httpClient";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom";

export function LoginForm(props) {
  const [formData, setFormData] = useState({});
  const setUser = useState("");

  //useNavigate added to try and navigate to '/landing' page
  const navigate = useNavigate();

  const setData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInUser = async () => {
    console.log(formData);

    try {
      const resp = await httpClient.post(
        "https://uabout.herokuapp.com/api/login",
        formData
      );
      if (resp.data.error){

      } else {
        navigate("/landing");
      }
      console.log(resp);
      return resp
    } catch (e) {
      console.log(e);
    }
  };

  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
          required
          onChange={(e) => setData(e)}
        />
        <Input
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          required
          onChange={(e) => setData(e)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={logInUser}>
        Log In
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
