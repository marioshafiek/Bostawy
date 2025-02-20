import React from "react";
import * as Yup from "yup";
//Components
import AuthForm from "../componentes/forms/AuthForm";
//Router
import { useNavigate } from "react-router-dom";
//Redux
import { useDispatch } from "react-redux";
import { signupUser } from "../store/auth/actions/actSignup";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await dispatch(signupUser(values)).unwrap();
      setStatus({ success: "Signed up successfully!" });
      navigate("/");
    } catch (error) {
      setStatus({ error: "Sign up failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  return (
    <div className="max-w-md mx-auto p-4 pt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <AuthForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
        submitText="Sign Up"
      />
    </div>
  );
};

export default SignUp;
