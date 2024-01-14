import React from 'react';
import {AuthForm} from "../modules/authentication";

function RegisterPage() {
    return (
        <AuthForm isLogin={false} />
    );
}

export default RegisterPage;