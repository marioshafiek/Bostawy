import React from "react";
// Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// Redux
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/products/actions/actAddProduct";
// SweetAlert2
import Swal from "sweetalert2";

const ProductForm = ({ categories }) => {
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  });

  // form fields.
  const formFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "price", label: "Price", type: "number" },
    { name: "category", label: "Category", type: "select", options: categories },
    { name: "image", label: "Image URL", type: "text" },
  ];

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      await dispatch(addProduct(values)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Product added!",
        text: "Your product was added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      setStatus({ success: "Product added successfully!" });
      resetForm();
    } catch (error) {
      setStatus({ error: error });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, status }) => (
        <Form className="flex flex-col gap-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block mb-1">
                {field.label}
              </label>
              {field.type === "select" ? (
                <Field
                  as="select"
                  name={field.name}
                  id={field.name}
                  className="w-full border border-gray-300 p-2 rounded appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </Field>
              ) : field.type === "textarea" ? (
                <Field
                  as="textarea"
                  name={field.name}
                  id={field.name}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              ) : (
                <Field
                  name={field.name}
                  type={field.type}
                  id={field.name}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              )}
              <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
            </div>
          ))}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-[#e30715] text-white font-semibold rounded hover:opacity-[70%] transition"
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </button>
          </div>

          {/* Status Message */}
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

export default ProductForm;
