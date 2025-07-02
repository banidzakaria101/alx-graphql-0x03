import React, { useEffect } from "react"; 

const ErrorProneComponent: React.FC = () => {
    useEffect(() => {
        throw new Error("This is a test error");
    }, []);
    return <p>If you're seeing this, the error didn't throw yet.</p>;
};

export default ErrorProneComponent;