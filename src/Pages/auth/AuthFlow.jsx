import { useState, useRef } from "react";
import { AnimatePresence } from "motion/react";

export default function AuthFlow() {
  const [step, setStep] = useState("choice");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLogin, setIsLogin] = useState(false);

  const otpInputs = useRef([]);

  const resetAll = () => {
    setStep("choice");
    setName("");
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <>
        <h1>Hello</h1>
      </>
      <AnimatePresence mode="wait">
        {step === "choice" && (
          <Choice
            onLogin={() => {
              setIsLogin(true);
              setStep("login");
            }}
            onRegister={() => {
              setIsLogin(false);
              setStep("register");
            }}
          />
        )}

        {step === "login" && (
          <Login
            mobile={mobile}
            setMobile={setMobile}
            onSubmit={() => setStep("otp")}
            onBack={resetAll}
          />
        )}

        {step === "register" && (
          <Register
            name={name}
            mobile={mobile}
            setName={setName}
            setMobile={setMobile}
            onSubmit={() => setStep("otp")}
            onBack={resetAll}
          />
        )}

        {step === "otp" && (
          <Otp
            mobile={mobile}
            otp={otp}
            setOtp={setOtp}
            inputsRef={otpInputs}
            onSuccess={() => {
              setStep("success");
              setTimeout(() => resetAll(), 3000);
            }}
            onBack={() => setStep(isLogin ? "login" : "register")}
          />
        )}

        {step === "success" && <Success isLogin={isLogin} name={name} />}
      </AnimatePresence>
    </div>
  );
}
