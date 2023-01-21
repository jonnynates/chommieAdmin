import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Client } from "../../../api";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const filter = createFilterOptions();

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  discord_name: "",
  discord_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
};

const customerSchema = Yup.object().shape({
  discord_name: Yup.string().required("Require a customer name"),
  discord_id: Yup.string(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string().email("Invalid email."),
  phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid."),
});

export default function UserComboBox({ users, customer, setCustomer }) {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleSubmit = (values) => {
    Client.createUser({
      discord_name: values.discord_name,
      discord_id: values.discord_id,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
    })
      .then((res) => res.json())
      .then((result) => {
        setCustomer({
          discord_name: values.discord_name,
          discord_id: values.discord_id,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_number: values.phone_number,
        });

        users.push(customer);
        handleClose();
      });
  };

  return (
    <Fragment>
      <Autocomplete
        value={customer}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
          } else {
            setCustomer(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              discord_name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={users}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.discord_name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>{option.discord_name}</li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Customer Name" required />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={customerSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form autoComplete={"off"}>
              <DialogTitle>Add a new customer</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please add new customer details. To get "discord_id" right
                  click user on discord and click "Copy ID"
                </DialogContentText>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="flex flex-col pt-4">
                    <TextField
                      variant="standard"
                      type="text"
                      label="Discord Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.discord_name}
                      name="discord_name"
                      error={!!touched.discord_name && !!errors.discord_name}
                      helperText={touched.discord_name && errors.discord_name}
                    />
                  </div>
                  <div className="flex flex-col pt-4">
                    <TextField
                      variant="standard"
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      name="first_name"
                      error={!!touched.first_name && !!errors.first_name}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </div>
                  <div className="flex flex-col pt-4">
                    <TextField
                      variant="standard"
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      name="last_name"
                      error={!!touched.last_name && !!errors.last_name}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </div>

                  <div className="flex flex-col pt-4">
                    <TextField
                      variant="standard"
                      type="text"
                      label="Discord ID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.discord_id}
                      name="discord_id"
                      error={!!touched.discord_id && !!errors.discord_id}
                      helperText={touched.discord_id && errors.discord_id}
                    />
                  </div>
                  <div className="flex flex-col pt-4">
                    <TextField
                      variant="standard"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </div>
                  <div className="flex flex-col pt-4">
                    <TextField
                      variant="standard"
                      type="text"
                      label="Phone Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone_number}
                      name="phone_number"
                      error={!!touched.phone_number && !!errors.phone_number}
                      helperText={touched.phone_number && errors.phone_number}
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Fragment>
  );
}
