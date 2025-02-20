import React from "react";
import * as Yup from "yup";
//Components
import AuthForm from "../componentes/forms/AuthForm";
//Router
import { useNavigate } from "react-router-dom";
//Redux
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth/actions/actLogin";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      setStatus({ success: "Signed in successfully!" });
      navigate("/");
    } catch (error) {
      setStatus({ error: "Sign in failed. Please check your credentials." });
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { label: "Username", name: "username", type: "username" },
    { label: "Password", name: "password", type: "password" },
  ];

  return (
    <div className="max-w-md mx-auto p-4 pt-30">
      <h2 className="text-2xl font-bold pb-4 text-center">Sign In</h2>
      <AuthForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
        submitText="Sign In"
      />
    </div>
  );
};

export default SignIn;
