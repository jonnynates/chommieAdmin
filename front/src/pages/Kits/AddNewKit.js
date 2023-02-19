import {
  Autocomplete,
  Checkbox,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../api";
import * as Yup from "yup";

const initialValues = {
  product_line: "",
  product_name: "",
  sku_code: "",
  price: "",
  exclusive: "",
};

const kitSchema = Yup.object().shape({
  product_line: Yup.string().required(
    "Please select a product line. If the product line isn't available choose other or contact Screech"
  ),
  product_name: Yup.string().required("Please input a product name"),
  sku_code: Yup.string().required("SKU is required"),
  price: Yup.string().required("Please add a price"),
  exclusive: Yup.string(),
});

function AddNewKit() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product_lines, setProductLines] = useState([]);

  useEffect(() => {
    fetchAllProductLines();
  }, []);

  const fetchAllProductLines = () => {
    Client.getAllProductLines()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProductLines(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const createKit = async (values) => {
    const kitBody = {
      name: values.product_name,
      product_line: values.product_line,
      exclusive: values.exclusive,
      price: values.price,
      sku_code: values.sku_code,
    };
    try {
      const response = await Client.createKit(kitBody);
      if (response.ok) {
        return navigate(-1);
      }
    } catch (err) {
      setError(err); // handle error
    }
  };

  return (
    <>
      {Boolean(product_lines) && (
        <div className="mt-10 w-3/4 m-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Kit Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">kit</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <Formik
                initialValues={initialValues}
                onSubmit={createKit}
                validationSchema={kitSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                }) => (
                  <Form autoComplete={"off"}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <Autocomplete
                              disablePortal
                              id="product_line"
                              name="product_line"
                              options={product_lines}
                              getOptionLabel={(option) =>
                                option.product_line_name
                              }
                              onChange={(e, value) =>
                                setFieldValue("product_line", value?.id)
                              }
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Product Lines"
                                  name="product_line"
                                  error={
                                    !!touched.product_line &&
                                    !!errors.product_line
                                  }
                                  helperText={
                                    touched.product_line && errors.product_line
                                  }
                                  onBlur={handleBlur}
                                  required
                                />
                              )}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="Product Name"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.product_name}
                              name="product_name"
                              error={
                                !!touched.product_name && !!errors.product_name
                              }
                              helperText={
                                touched.product_name && errors.product_name
                              }
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <TextField
                              id="outlined-basic"
                              label="SKU Code"
                              variant="outlined"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.sku_code}
                              name="sku_code"
                              error={!!touched.sku_code && !!errors.sku_code}
                              helperText={touched.sku_code && errors.sku_code}
                              sx={{ width: 300 }}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <FormControl sx={{ width: 300 }}>
                              <InputLabel htmlFor="outlined-adornment-amount">
                                Price
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={
                                  <InputAdornment position="start">
                                    R
                                  </InputAdornment>
                                }
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                              />
                            </FormControl>
                          </div>

                          <div className="col-span-6 sm:col-span-6">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  checked={values.exclusive}
                                  name="exclusive"
                                />
                              }
                              label="Exclusive"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          type="submit"
                        >
                          Add Kit
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

export default AddNewKit;
