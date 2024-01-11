import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import Alert from "@mui/material/Alert";

const Contact = () => {
    const form = useRef();
    const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const [emailSent, setEmailSent] = useState(false); // State to manage alert visibility

    const sendEmail = async (e) => {
        e.preventDefault();

        emailjs
            .sendForm(emailServiceId, templateId, form.current, publicKey)
            .then(
                (result) => {
                    console.log(result.text);
                    setEmailSent(true); // Set state to display the alert
                    form.current.reset(); // Reset the form fields
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };
    return (
        <StyledContactForm>
            <form ref={form} onSubmit={sendEmail}>
                <label>Dit navn</label>
                <input type="text" name="user_name" />
                <label>Din e-mail</label>
                <input type="email" name="user_email" />
                <label>Din besked</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
            </form>
            {emailSent && (
                <Alert severity="success" color="info">
                    E-mail var sendt!
                </Alert>
            )}
        </StyledContactForm>
    );
};

export default Contact;

const StyledContactForm = styled.div`
    width: 400px;

    form {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;
        font-size: 16px;

        input {
            width: 100%;
            height: 35px;
            padding: 7px;
            outline: none;
            border-radius: 5px;
            border: 1px solid rgb(220, 220, 220);

            &:focus {
                border: 2px solid rgba(0, 206, 158, 1);
            }
        }

        textarea {
            max-width: 100%;
            min-width: 100%;
            width: 100%;
            max-height: 100px;
            min-height: 100px;
            padding: 7px;
            outline: none;
            border-radius: 5px;
            border: 1px solid rgb(220, 220, 220);

            &:focus {
                border: 2px solid rgba(0, 206, 158, 1);
            }
        }

        label {
            margin-top: 1rem;
        }

        input[type="submit"] {
            margin-top: 2rem;
            cursor: pointer;
            background: rgb(249, 105, 14);
            color: white;
            border: none;
        }
    }
`;
