import { Container, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
    // set state for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // initalize dispatch
    const dispatch = useDispatch();

    // login function
    const login = (event) => {
        event.preventDefault();
        if(username && password) {
            dispatch({
            //  put login dispatch here
            })
        }
    }
    return (
        <Flex>
            <Container>

            </Container>
        </Flex>
    )
}