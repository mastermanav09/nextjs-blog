import React from "react";
import ContactForm from "../../components/contact/ContactForm";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact page</title>
        <meta name="description" content="Feedback page." />
      </Head>
      <ContactForm />
    </>
  );
};

export default ContactPage;
