import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button} from "@chakra-ui/react";

export default function LogoutButton() {
    // init use history
    const history = useHistory();
    // init dispatch
    const dispatch = useDispatch();

    return (
        // logout buttion that makes a dispatch to log the user out then push them to the login page
        <Button variant={'link'} size={'lg'} color={'brand.text'} onClick={() => {dispatch({ type: 'LOGOUT'}); history.push('/login')}}>
            Logout
        </Button>
    )
}