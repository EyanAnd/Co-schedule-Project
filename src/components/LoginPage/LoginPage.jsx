import { Container, Flex, Heading, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

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
        <Flex>
            <Container>
                <Heading>Login</Heading>
                <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={login} >Submit</Button>
                <LogoutButton />
            </Container>
        </Flex>
    )
}