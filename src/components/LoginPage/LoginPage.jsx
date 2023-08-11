import { Container, Flex, Heading, Input, Button, Box } from "@chakra-ui/react";
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
        <Container alignContent={'center'} justifyContent={'center'} borderColor={'brand.orange'} borderWidth={'1px'} borderRadius={'md'}>
            <Flex display={'flex'} flexDirection={'row'} gap={2} padding={2}>
                <Container flexDirection={'column'} display={'flex'} alignItems={'center'} >
                    <Heading color={'brand.text'}>Login</Heading>
                    <Flex flexDirection={'column'} width={'50%'} gap={4} padding={2}>
                        <Input color={'brand.text'} variant={'flushed'} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input color={'brand.text'} variant={'flushed'} placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Flex>
                    <Flex flexDirection={'row'} gap={2}>
                        <Button color={'white'} bgColor={'brand.orange'} onClick={login} >Submit</Button>
                        <Button bgColor={'brand.text'} color={'white'} onClick={() => history.push('/register')}>Register</Button>
                    </Flex>
                </Container>
            </Flex>
        </Container>
    )
}