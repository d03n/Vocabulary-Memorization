import React, { ReactNode, useCallback, useState } from 'react';

export default function component() {
    const [count, setCount] = useState(0)
    React.MouseEventHandler<HTMLButtonElement
    return (
        <>
            <p> {count} </p>
            <button onClick={() => setCount(count + 1)}>Click!</button>
        </>
    )
};