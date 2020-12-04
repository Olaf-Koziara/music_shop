import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Button from "./atoms/Button";
import emailjs from "emailjs-com";
//service_vfj1x5p
//template_lx3f8cl
//user_HTuvMjNDvpWhpH7De9mcb
const StyledError = styled.div`
  color: red;
  width: 30px;
`;
const StyledCheckBox = styled(Field)`
  margin: 6px;
`;

const contactFormSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email").required("Enter email"),
  message: Yup.string().required("Enter message"),
  subject: Yup.string().required("Enter subject"),
  accept: Yup.bool().oneOf([true], "Accept terms"),
});
const StyledInput = styled(Field)`
  border: 0;
  box-shadow: 1px 1px 3px 0 black;
  margin: 4px;
  width: 300px;
`;
const StyledForm = styled(Form)`
  width: 30%;
  margin: auto;
`;
const ContactForm = () => {
  const handleFormSubmit = (e, values) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vfj1x5p",
        "template_lx3f8cl",
        e.target,
        "user_HTuvMjNDvpWhpH7De9mcb",
      )
      .then((res) => console.log(res));
    e.target.reset();
  };
  return (
    <Formik
      initialValues={{
        email: "",
        message: "",
        accept: false,
        subject: "",
      }}
      // onSubmit={(values) => {
      //   console.log(values);
      // }}
      validationSchema={contactFormSchema}
    >
      {(values) => (
        <StyledForm onSubmit={(e) => handleFormSubmit(e, values)}>
          <StyledInput
            id="subject"
            name="subject"
            type="text"
            placeholder="subject"
            value={values.subject}
          />
          <StyledError>
            <ErrorMessage name="subject" />
          </StyledError>
          <StyledInput
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={values.email}
          />
          <StyledError>
            <ErrorMessage name="email" />
          </StyledError>
          <StyledInput
            id="message"
            name="message"
            type="text"
            placeholder="message"
            value={values.message}
            component="textarea"
          />
          <StyledError>
            <ErrorMessage name="message" />
          </StyledError>
          <StyledCheckBox
            id="accept"
            name="accept"
            type="checkbox"
            placeholder="accept"
            value={values.accept}
          />{" "}
          Terms
          <StyledError>
            <ErrorMessage name="accept" />
          </StyledError>
          <Button type="submit">Send</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default ContactForm;
