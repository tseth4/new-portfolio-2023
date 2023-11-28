import "./AboutStyles.scss";
import AboutData from "@/data/about-data.json";
import Button from "../Button/Button";
import { useState, useEffect, useRef } from "react";
import { useFormspark } from "@formspark/use-formspark";
// import reCAPTCHA from "react-google-recaptcha";
import ReCAPTCHA from "react-google-recaptcha";

const FORMSPARK_FORM_ID = process.env.FORMSPARK_FORM_ID;

export default function About() {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const [isModalClassNameChanged, setModalClassNameChanged] = useState(false);
  const [form, setForm] = useState({});

  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID || "",
  });

  const handleContactModal = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setModalClassNameChanged((prevState) => !prevState);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (captchaRef && captchaRef.current) {
      const token = captchaRef.current?.getValue();
      let response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).catch((e) => console.log("contact submission error: ", e));
      if (response && response.ok) {
        let data = await response.json();
        if (data && data.response.success) {
          await submit(form);
          captchaRef.current?.reset();
          handleContactModal(e);
        }
      }
    }
  };

  useEffect(() => {
    let body = document.querySelector("body");

    if (isModalClassNameChanged) {
      body?.classList.add("modal--opened");
    } else {
      body?.classList.remove("modal--opened");
    }
  }, [isModalClassNameChanged]);

  const modalClassName = isModalClassNameChanged
    ? "about__contact-modal about__contact-modal--opened"
    : "about__contact-modal";
  const modalBgOverlayClassName = isModalClassNameChanged
    ? "about__bg-overlay about__bg-overlay--opened"
    : "about__bg-overlay";

  return (
    <>
      <div className="about">
        <form method="POST" onSubmit={onSubmit} className={modalClassName}>
          <h2>Say Hello! 👋</h2>
          <input
            type="text"
            id="about__contact-input-name"
            name="name"
            required={true}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="name"
          />
          <input
            type="text"
            id="about__contact-input-email"
            name="email"
            required={true}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email"
          />
          <textarea
            id="about__contact-input-message"
            name="message"
            required={true}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="message"
          />
          {process.env.GOOGLE_RECAPTCHA_SITE_KEY ? (
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
            />
          ) : (
            ""
          )}

          <Button type="submit" disabled={submitting}>
            Send
          </Button>
        </form>

        <div className="about__info">
          <h1>{AboutData.about.h1}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: AboutData.about.paragraph }}
          />
          <div className="about__contact-btn-container">
            <Button onClick={handleContactModal} classname="about__contact-btn">
              Say Hello! 👋
            </Button>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => handleContactModal(e)}
        className={modalBgOverlayClassName}
      ></div>
    </>
  );
}
