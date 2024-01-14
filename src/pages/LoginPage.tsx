import React from 'react';
import {AuthForm} from '../modules/authentication/index'

function LoginPage() {
    return (
        <>
            <AuthForm isLogin={true} />
        </>
    );
}

export default LoginPage;