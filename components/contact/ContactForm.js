import { useState, useEffect } from "react";
import Notification from "../ui/Notification";
import classes from "./ContactForm.module.css";
import { ReactDOM } from "react";

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // pending, success, error
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();
    setErrorStatus(null);
    // optional: add client-side validation

    try {
      setRequestStatus("pending");
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          name: enteredName,
          message: enteredMessage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("contact form 1");

      const data = await response.json();
      setErrorStatus(data.message);

      if (!response.ok) {
        console.log("responseok wrror");
        setRequestStatus("error");
        setErrorStatus(data.message);
        throw new Error(data.message || "Something went wrong!");
      }

      console.log("contact form 2");

      setRequestStatus("success");

      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      console.log("contact form error catch");
      setRequestStatus("error");
    }
  }

  let notificationData;

  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way.",
    };
  }

  if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: errorStatus || "Sorry! We couldn't send your message.",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>

      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
