import React from "react";
//Formik
import { Formik, Field, Form, ErrorMessage } from "formik";

const AuthForm = ({ initialValues, validationSchema, onSubmit, fields, submitText }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, status }) => (
        <Form className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block">
                {field.label}
              </label>
              <Field
                name={field.name}
                type={field.type}
                id={field.name}
                className="w-full border border-gray-300 p-2 rounded"
                {...field.props}
              />
              <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
            </div>
          ))}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-[#e30715] text-white font-semibold rounded hover:opacity-[70%] transition"
            >
              {isSubmitting ? "Submitting..." : submitText}
            </button>
          </div>

          {status && status.success && (
            <div className="text-green-600 text-center">{status.success}</div>
          )}
          {status && status.error && (
            <div className="text-red-600 text-center">{status.error}</div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
