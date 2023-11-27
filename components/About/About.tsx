import "./AboutStyles.scss";
import AboutData from "@/data/about-data.json";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "CwS48rGng";

export default function About() {
  const [isModalClassNameChanged, setModalClassNameChanged] = useState(false);
  const [form, setForm] = useState({});

  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const handleContactModal = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setModalClassNameChanged((prevState) => !prevState);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await submit(form);
    alert("Form submitted");
    handleContactModal(e);
  };

  useEffect(() => {
    let body = document.querySelector("body");

    console.log("isModalClassNameChanged: ", isModalClassNameChanged);
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
        <form onSubmit={onSubmit} className={modalClassName}>
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
