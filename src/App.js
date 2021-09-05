import React from "react";
import "./App.css";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [formData, setFormData] = React.useState({});
  const [recaptchaValue, setRecaptchaValue] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  return (
    <div className="app">
      <form
        className="form"
        action=""
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
                siteKey: "6LeNrUYcAAAAALUbe5rhHLjCRTIhLORnDKOYoaBX",
              },
            }
          );
          console.log("serverResponse data", serverResponse.data);

          // const googleResponse = await axios.post(
          //   "https://www.google.com/recaptcha/api/siteverify",
          //   {
          //     secret,
          //     response,
          //   }
          // );
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ [e.target.name]: e.target.value })}
        />

        <ReCAPTCHA
          sitekey="6LeNrUYcAAAAALUbe5rhHLjCRTIhLORnDKOYoaBX"
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
