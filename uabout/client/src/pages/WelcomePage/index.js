import styled from "styled-components";
import { AccountBox } from '../../components/AccountBox'


const WelcomePage = () => {

  const AppContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: none;
  background-size: cover;
`

    return (
        <AppContainer>
            <AccountBox />
        </AppContainer>
    );

}
export default WelcomePage;