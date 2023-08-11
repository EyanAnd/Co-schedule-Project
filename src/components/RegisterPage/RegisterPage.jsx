import { Center, Button, Flex, Heading, Container, Input, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function RegisterPage() {
    // set state for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // init use dispatch
    const dispatch = useDispatch();

    // init use history
    const history = useHistory();

    const registerUser = (event) => {
        event.preventDefault();

        dispatch({
            type: 'REGISTER',
            payload: {
                user: {
                    username: username,
                    password: password,
                },
            },
        });
        setUsername('');
        setPassword('');
        history.push('/home')
    };

    return (
        <Container alignContent={'center'} justifyContent={'center'} borderColor={'brand.orange'} borderWidth={'1px'} borderRadius={'md'}>
            <Flex display={'flex'} flexDirection={'row'} gap={2} padding={2}>
                <Container flexDirection={'column'} display={'flex'} alignItems={'center'} >
                    <Heading color={'brand.text'}>Register</Heading>
                    <Flex flexDirection={'column'} width={'50%'} gap={4} padding={2}>
                        <Input color={'brand.text'} variant={'flushed'} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input color={'brand.text'} variant={'flushed'} placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Flex>
                    <Flex flexDirection={'row'} gap={2}>
                        <Button color={'white'} bgColor={'brand.orange'} onClick={registerUser} >Register</Button>
                        <Button color={'white'} bgColor={'brand.text'} onClick={() => history.push('/login')}>Login</Button>
                    </Flex>
                </Container>
            </Flex>
        </Container>

    )
}