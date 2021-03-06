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
const StyledField = styled(Field)`
  line-height: 50px;
  background-color: #fafafa;

  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;
  width: 260px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  transition: all 0.4s ease;
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
        <Form className="contact-form">
          <StyledField
            id="subject"
            name="subject"
            type="text"
            placeholder="subject"
            value={values.subject}
          />
          <StyledError>
            <ErrorMessage name="subject" />
          </StyledError>
          <StyledField
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={values.email}
          />
          <ErrorMessage name="email" />
          <StyledField
            id="message"
            name="message"
            type="text"
            placeholder="message"
            value={values.message}
            component="textarea"
          />
          <ErrorMessage name="message" />
          <label htmlFor="accept">Accept terms</label>
          <StyledField
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
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
