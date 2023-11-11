import React from "react";
import CombinedForm from "../../components/CombinedForm";

const Register = () => {
    const handleRegisterSubmit = () => {};

    return (
        <CombinedForm
            showRegisterForm={true}
            onRegisterSubmit={handleRegisterSubmit}
            registerUsernameLabel="Brugernavn"
            registerFirstNameLabel="Fornavn"
            registerLastNameLabel="Efternavn"
            registerEmailLabel="E-mail"
            registerDateOfBirthLabel="Fødselsdato"
            registerPasswordLabel="Password"
            registerPasswordCheckLabel="Genindtast password"
        />
    );
};

export default Register;
