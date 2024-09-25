import { Login } from '../components/Login';
import { Register } from '../components/Register';

function Home() {
    console.log("--");
    return (
        <>
            <Login></Login>
            <br></br>
            <Register></Register>
        </>
    );
}

export {Home}