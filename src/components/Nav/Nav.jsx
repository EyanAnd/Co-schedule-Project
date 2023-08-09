import { Flex, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// imports for components on the nav bar
import LogoutButton from "../LogoutButton/LogoutButton";



export default function Nav() {

    // init use history
    const history = useHistory();
    // user
    const user = useSelector((store) => store.user)
    return (
        <Flex direction={'row'} align={'right'} justifyContent={'right'}>
            {/*  is a user logged in? if so show these routes */}
            {user.id ? (
                <Tabs>
                    <TabList>
                        <Tab onClick={() => history.push('/#/home')}>Home</Tab>
                        <Tab onClick={() => history.push('/favorites')}>Favorites</Tab>
                        <LogoutButton />
                    </TabList>
                </Tabs>)
                :
                // if a user isn't logged in, show these routes
                <Tabs>
                    <TabList>
                        <Tab onClick={() => history.push('/home')}>Home</Tab>
                        <Tab onClick={() => history.push('/login')}>Login / Register </Tab>
                    </TabList>
                </Tabs>}
        </Flex>
    )
}