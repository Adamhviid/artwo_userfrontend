import React from "react";
import CombinedForm from "../../components/CombinedForm";

const LoginPage = () => {
    const handleLoginSubmit = () => {};

    return (
        <CombinedForm
            showLoginForm={true}
            onLoginSubmit={handleLoginSubmit}
            loginUsernameLabel="Brugernavn"
            loginPasswordLabel="Password"
        />
    );
};

export default LoginPage;
