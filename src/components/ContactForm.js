import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Button from "./atoms/Button";

const StyledError = styled.div`
  color: red;
`;

const contactFormSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email").required("Enter email"),
  message: Yup.string().required("Enter message"),
  subject: Yup.string().required("Enter subject"),
  accept: Yup.bool().oneOf([true], "Accept terms"),
});

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        message: "",
        accept: false,
        subject: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={contactFormSchema}
    >
      {(values) => (
        <Form>
          <Field
            id="subject"
            name="subject"
            type="text"
            placeholder="subject"
            value={values.subject}
          />
          <StyledError>
            <ErrorMessage name="subject" />
          </StyledError>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={values.email}
          />
          <ErrorMessage name="email" />
          <Field
            id="message"
            name="message"
            type="text"
            placeholder="message"
            value={values.message}
            component="textarea"
          />
          <ErrorMessage name="message" />
          <Field
            id="accept"
            name="accept"
            type="checkbox"
            placeholder="accept"
            value={values.accept}
          />
          <ErrorMessage name="accept" />
          <Button type="submit">Send</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
