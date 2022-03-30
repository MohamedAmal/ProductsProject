import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
const FetchState = () => {
    return <Headline />;
};
const Headline = () => {
    // const [rState, setrState] = useState(false);
    console.log('this is heading')
    const { location } = useLocation()
    console.log(location.pathname)

    return (
        <div>
            {
                location.state == undefined &&
                <div className="row my-4">
                    a7aaa
                </div>
            }
        </div>
    );
};

export default FetchState;