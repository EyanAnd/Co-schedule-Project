import { Flex, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// imports for components on the nav bar
import LogoutButton from "../LogoutButton/LogoutButton";
import LoginPage from "../LoginPage/LoginPage";


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
                        <Tab>Logout</Tab>
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