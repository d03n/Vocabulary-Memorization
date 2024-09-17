import { useState } from "react";

function Button({ start }) {
    const [counter, setCounter] = useState(start);

    return (
        <>
            <h2> {counter} </h2>
            <button onClick={() => setCounter(counter + 1)}>Click!</button>
        </>
    )
}

module.exports = Buttton;