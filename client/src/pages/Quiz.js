import { useParams } from "react-router-dom";

function Quiz(props) {
    const {id} = useParams();
    return (
        <>
            <h1>Quiz {id} </h1>
        </>
    );
}

export { Quiz };