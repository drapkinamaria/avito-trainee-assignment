import React from 'react'
import {useState} from "react";
import { Alert, Form, Button, Container } from 'react-bootstrap';

export function LoginForm(): JSX.Element {
    const [inputPassword, setInputPassword] = useState<string>('');
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const hardCodedPassword = "secretPassword123";

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputPassword === hardCodedPassword) {
            setIsAuthorized(true);
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
                <Alert variant={isAuthorized ? "success" : "danger"} className="mt-3">
                    {isAuthorized ? "Введен правильный пароль" : "Введен неправильный пароль"}
                </Alert>
            )}
        </Container>
    );
}
