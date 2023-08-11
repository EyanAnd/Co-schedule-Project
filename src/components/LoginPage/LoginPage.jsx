import { Container, Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
    // set state for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // initalize dispatch
    const dispatch = useDispatch();

    // initalize use history
    const history = useHistory();

    // bring in errors reducer
    const errors = useSelector((store) => store.errorsReducer)

    // login function
    const login = (event) => {
        event.preventDefault();
        if (username && password) {
            // dispatch to send the user payload to the backend
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: {
                        username: username,
                        password: password,
                    }
                },
            });
            // after successful login attempt to push them to the homepage
            history.push('/home');
        } else {
            // else log the input error
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    };

    return (
        <Container alignContent={'center'} justifyContent={'center'} borderColor={'brand.orange'} borderWidth={'1px'} borderRadius={'md'}>
            <Flex display={'flex'} flexDirection={'row'} gap={2} padding={2}>
                <Container flexDirection={'column'} display={'flex'} alignItems={'center'} >
                    <Heading color={'brand.text'}>Login</Heading>
                    {errors.loginMessage && (
                        <Text color={'brand.orange'} >{errors.loginMessage}</Text>
                    )}
                    <Flex flexDirection={'column'} width={'50%'} gap={4} padding={2}>
                        {/* set values for username and password */}
                        <Input color={'brand.text'} variant={'flushed'} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input color={'brand.text'} variant={'flushed'} placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Flex>
                    <Flex flexDirection={'row'} gap={2}>
                        {/* on click login the user when they press submit */}
                        <Button color={'white'} bgColor={'brand.orange'} onClick={login} >Submit</Button>
                        {/* push them to the register page */}
                        <Button bgColor={'brand.text'} color={'white'} onClick={() => history.push('/register')}>Register</Button>
                    </Flex>
                </Container>
            </Flex>
        </Container>
    )
}