import React, {ChangeEvent, FormEvent} from 'react'
import {useState} from "react";
import { Alert, Form, Button, Container } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../const";
import {useAuth} from "../components/auth-context";

export function LoginForm(): JSX.Element {
    const [inputPassword, setInputPassword] = useState<string>('');
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const { setAuthStatus } = useAuth();
    const navigate = useNavigate();

    const hardCodedPassword = '';

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputPassword === hardCodedPassword) {
            setAuthStatus(AuthorizationStatus.Auth);
            navigate(AppRoute.Root);
        } else {
            setIsAuthorized(false);
        }
    };

    return (
        <Container className="pt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={inputPassword}
                                  onChange={handlePasswordChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {isAuthorized !== null && (
                <Alert variant={isAuthorized ? 'success' : 'danger'} className="mt-3">
                    {isAuthorized ? 'Введен правильный пароль' : 'Введен неправильный пароль'}
                </Alert>
            )}
        </Container>
    );
}
