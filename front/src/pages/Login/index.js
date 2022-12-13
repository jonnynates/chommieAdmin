import { useState } from "react";
import { Client, DEFAULT_SERVER_ERROR_MESSAGE } from "../../api";
import { ApiError } from "../../api/client";
import useLocalStorage, {
  TOKEN_STORAGE_KEY,
} from "../../utils/useLocalStorage";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import { Eye } from "react-feather";
import { redirect, useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(1, "Password is too short - should be 8 chars minimum."),
});

export default function Login() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [tokenInStorage, setTokenInStorage] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null
  );
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleLogin = async (values) => {
    try {
      Client.signInUser({
        username: values.username,
        password: values.password,
        grant_type: "password",
        client_id: null,
        client_secret: null,
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          setTokenInStorage(data.access_token);
        });
    } catch (err) {
      if (err instanceof ApiError) {
        setServerErrorMessage(err.message);
      } else {
        setServerErrorMessage(DEFAULT_SERVER_ERROR_MESSAGE);
      }
    }
  };

  if (tokenInStorage) {
    return navigate("/new-request");
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {serverErrorMessage !== "" ? (
            <div className="mb-2 mt-8 max-w-md">{serverErrorMessage}</div>
          ) : null}
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col pt-3 md:pt-4" autoComplete={"off"}>
                <div className="flex flex-col pt-4">
                  <Field
                    as={Input}
                    name="username"
                    placeholder="bob"
                    id="username"
                    label="Username"
                    labelFor="username"
                    type="username"
                    autoComplete="off"
                    errors={touched.username && errors.username}
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <Field
                    as={Input}
                    name="password"
                    label="Password"
                    id="password"
                    labelFor="password"
                    autoComplete="current-password"
                    placeholder="Your secret password"
                    type={showPassword ? "text" : "password"}
                    icon={
                      <button
                        type="button"
                        className="cursor-pointer z-20"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Eye size={24} />
                      </button>
                    }
                    errors={touched.password && errors.password}
                  />
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
