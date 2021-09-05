import React from "react";
import "./App.css";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [formData, setFormData] = React.useState({ name: "" });
  const [recaptchaValue, setRecaptchaValue] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  return (
    <div className="app">
      <form
        className="form"
        onSubmit={async (e) => {
          console.log("submitted form");
          e.preventDefault();
          console.log("formData", formData);
          console.log("recaptchaValue", recaptchaValue);

          //   const clientIp = await axios.get("https://api.ipify.org?format=json");
          //   console.log("clientIp", clientIp);

          const serverResponse = await axios.post(
            "http://localhost:8000/post",
            {
              formData,
              recaptcha: {
                value: recaptchaValue,
                siteKey: "SITE_KEY",
              },
            }
          );
          console.log("serverResponse data", serverResponse.data);

          // const googleResponse = await axios.post(
          //   "https://www.google.com/recaptcha/api/siteverify",
          //   {
          //     secret: <SITE_KEY>,
          //     response: <VALUE_FROM_CAPTCHA_ONCHANGE>,
          //   }
          // );
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ [e.target.name]: e.target.value })}
        />

        <ReCAPTCHA
          sitekey="SITE_KEY"
          onChange={(value) => {
            console.log("ReCAPTCHA value:", value);
            setRecaptchaValue(value);
            setIsDisabled(false);
          }}
          onExpired={() => {
            setIsDisabled(true);
          }}
          onErrored={() => {
            setIsDisabled(true);
          }}
        />

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
