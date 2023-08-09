import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button} from "@chakra-ui/react";

export default function LogoutButton() {
    // init use history
    const history = useHistory();
    // init dispatch
    const dispatch = useDispatch();

    return (
        <Button onClick={() => {dispatch({ type: 'LOGOUT'}); history.push('/login')}}>
            Logout
        </Button>
    )
}