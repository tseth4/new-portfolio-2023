"use client"
import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "CwS48rGng";

export default function Submit() {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [form, setForm] = useState({});

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await submit(form);
    alert("Form submitted");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required={true}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label>Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          required={true}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        ></textarea>
        <button type="submit" disabled={submitting}>
          Send
        </button>
      </form>
    </div>
  );
}
