import { Button, Flex, Heading, Container, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function RegisterPage() {
    // set state for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // init use dispatch
    const dispatch = useDispatch();

    // init use history
    const history = useHistory();

    // bring in errors reducer
    const errors = useSelector((store) => store.errorsReducer);

    const registerUser = (event) => {
        event.preventDefault();
        // dispatch to send the user info to the backend to register a user
        dispatch({
            type: 'REGISTER',
            payload: {
                user: {
                    username: username,
                    password: password,
                },
            },
        });
        // clear inputs
        setUsername('');
        setPassword('');
        // push them to the homescreen
        history.push('/home')
    };

    return (
        <Container alignContent={'center'} justifyContent={'center'} borderColor={'brand.orange'} borderWidth={'1px'} borderRadius={'md'}>
            <Flex display={'flex'} flexDirection={'row'} gap={2} padding={2}>
                <Container flexDirection={'column'} display={'flex'} alignItems={'center'} >
                    <Heading color={'brand.text'}>Register</Heading>
                    {errors.registerMessage && (
                        <Text color={'brand.orange'}>{errors.registerMessage}</Text>
                    )}
                    <Flex flexDirection={'column'} width={'50%'} gap={4} padding={2}>
                        {/* set the values for username and password */}
                        <Input color={'brand.text'} variant={'flushed'} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input color={'brand.text'} variant={'flushed'} placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Flex>
                    <Flex flexDirection={'row'} gap={2}>
                        {/* on click register a user wehn the click register */}
                        <Button color={'white'} bgColor={'brand.orange'} onClick={registerUser} >Register</Button>
                        {/* push them to the login page */}
                        <Button color={'white'} bgColor={'brand.text'} onClick={() => history.push('/login')}>Login</Button>
                    </Flex>
                </Container>
            </Flex>
        </Container>

    )
}