import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: grid;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: grid;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: black;
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: white;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  padding: 5%; 
  color: #072A4B;
  font-size: 15px;
  font-weight: 600;
  border: none;
  box-shadow: 0 2px 2px -1px;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #f1f1f1
  background: linear-gradient(
    58deg,
    #f1f1f1 20%,
    #f1f1f1 100%
  );

  &:hover {
    filter: brightness(1.03);
    color: #f1f1f1;
    background: #072A4B;
  }
`;
