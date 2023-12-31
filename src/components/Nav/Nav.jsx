import { Flex, ButtonGroup, Button, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// imports for components on the nav bar
import LogoutButton from "../LogoutButton/LogoutButton";



export default function Nav() {

    // init use history
    const history = useHistory();
    // grab the current user
    const user = useSelector((store) => store.user)
    return (
        <Flex justifyContent={'space-between'} align={'center'} gap={2} padding={4} >
            <Flex>
                <Heading as={'button'} variant={'link'} color={'brand.orange'} onClick={() => history.push('/home')}>Co-Schedule Project</Heading>
            </Flex>
            {/*  is a user logged in? if so show these routes */}
            <Flex>
                {user.id ? (
                    <>
                        <ButtonGroup >
                            <Button color={'brand.text'}  size={'lg'} variant={'link'} onClick={() => history.push('/#/home')}>Home</Button>
                            <Button color={'brand.text'}  size={'lg'} variant={'link'} onClick={() => history.push('/favorites')}>Favorites</Button>
                            <LogoutButton />
                        </ButtonGroup>
                    </>)
                    :
                    // if a user isn't logged in, show these routes
                    <>
                        <ButtonGroup gap={3}>
                            <Button color={'brand.text'} size={'lg'} variant={'link'} onClick={() => history.push('/home')}>Home</Button>
                            <Button color={'brand.text'} size={'lg'} variant={'link'} onClick={() => history.push('/login')}>Login / Register </Button>
                        </ButtonGroup>
                    </>}
            </Flex>
        </Flex>
    )
}