import { Container, Flex, Heading, Input, Button  } from "@chakra-ui/react";
import { useState } from "react";
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

    // login function
    const login = (event) => {
        event.preventDefault();
        if (username && password) {
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
            // history.push('/home');
        } else {
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    };


    return (
            <Flex display={'flex'} flexDirection={'row'} gap={2} padding={2}>
                <Container flexDirection={'column'} display={'flex'} alignItems={'center'} >
                    <Heading>Login</Heading>
                    <Flex flexDirection={'column'} width={'50%'} gap={4} padding={2}>
                        <Input variant={'flushed'} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input variant={'flushed'} placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Flex>
                    <Flex flexDirection={'row'} gap={2}>
                        <Button onClick={login} >Submit</Button>
                        <Button onClick={() => history.push('/register')}>Register</Button>
                    </Flex>
                </Container>
            </Flex>
    )
}