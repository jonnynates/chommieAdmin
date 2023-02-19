import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "../../api";
import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const customerSchema = Yup.object().shape({
  discord_name: Yup.string().required("Require a customer name"),
  discord_id: Yup.string(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string().email("Invalid email."),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid."),
  notes: Yup.string(),
});

function UserForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialValues, setInitialValues] = useState({
    discord_name: "",
    discord_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    notes: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUser();
    } else {
      setIsLoaded(true);
    }
  }, []);

  const fetchUser = () => {
    Client.getUserById(id)
      .then((res) => res.json())
      .then(
        (result) => {
          setInitialValues({
            discord_name:
              result.discord_name != null ? result.discord_name : "",
            discord_id: result.discord_id != null ? result.discord_id : "",
            first_name: result.first_name != null ? result.first_name : "",
            last_name: result.last_name != null ? result.last_name : "",
            email: result.email != null ? result.email : "",
            phone_number:
              result.phone_number != null ? result.phone_number : "",
            notes: result.notes != null ? result.notes : "",
          });
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const handleSubmit = async (values) => {
    try {
      const body = {
        discord_name: values.discord_name,
        discord_id: values.discord_id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        notes: values.notes,
      };
      let response;
      if (id) {
        response = await Client.updateUser(id, body);
      } else {
        response = await Client.createUser(body);
      }
      if (response.ok) {
        return navigate(-1);
      }
    } catch (err) {
      setError(err); // handle error
    }
  };

  return (
    <>
      {Boolean(isLoaded) && (
        <div className="mt-10 w-3/4 m-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Customer Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">customer</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={customerSchema}
                enableReinitialize={true}
              >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                  <Form autoComplete={"off"}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="Customer Name"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.discord_name}
                              name="discord_name"
                              error={
                                !!touched.discord_name && !!errors.discord_name
                              }
                              helperText={
                                touched.discord_name && errors.discord_name
                              }
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="Discord ID"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.discord_id}
                              name="discord_id"
                              error={
                                !!touched.discord_id && !!errors.discord_id
                              }
                              helperText={
                                touched.discord_id && errors.discord_id
                              }
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="First Name"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.first_name}
                              name="first_name"
                              error={
                                !!touched.first_name && !!errors.first_name
                              }
                              helperText={
                                touched.first_name && errors.first_name
                              }
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="Last Name"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.last_name}
                              name="last_name"
                              error={!!touched.last_name && !!errors.last_name}
                              helperText={touched.last_name && errors.last_name}
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="Email"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              name="email"
                              error={!!touched.email && !!errors.email}
                              helperText={touched.email && errors.email}
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="Phone Number"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.phone_number}
                              name="phone_number"
                              error={
                                !!touched.phone_number && !!errors.phone_number
                              }
                              helperText={
                                touched.phone_number && errors.phone_number
                              }
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-6">
                            <TextField
                              id="outlined-basic"
                              label="Additional notes"
                              variant="outlined"
                              className="block w-full rounded-md border-solid border border-gray-300 focus:border-gray-300 focus:ring-gray-300 focus-visible:outline-none p-3 resize-none"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.notes}
                              name="notes"
                              error={!!touched.notes && !!errors.notes}
                              helperText={touched.notes && errors.notes}
                              sx={{ width: 712 }}
                              multiline
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          type="submit"
                        >
                          Add Customer
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserForm;
