import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function UserComboBox({ users }) {
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      discord_name: "",
      discord_id: "",
      first_name: "",
      last_name: "",
      email: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    discord_name: "",
    discord_id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      discord_name: dialogValue.discord_name,
      discord_id: dialogValue.discord_id,
      first_name: dialogValue.first_name,
      last_name: dialogValue.last_name,
      email: dialogValue.email,
    });

    users.push(value)
    handleClose();
  };

  return (
    <Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                discord_name: newValue,
                discord_id: "",
                first_name: "",
                last_name: "",
                email: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              discord_name: newValue.inputValue,
              discord_id: "",
              first_name: "",
              last_name: "",
              email: "",
            });
          } else {
            setValue(newValue);
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
          <TextField {...params} label="Customer Name" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.discord_name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  discord_name: event.target.value,
                })
              }
              label="Discord Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="first_name"
              value={dialogValue.first_name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  first_name: event.target.value,
                })
              }
              label="First Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="last_name"
              value={dialogValue.last_name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  last_name: event.target.value,
                })
              }
              label="Last Name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="discord_id"
              value={dialogValue.discord_id}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  discord_id: event.target.value,
                })
              }
              label="Discord ID"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="email"
              value={dialogValue.email}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  email: event.target.value,
                })
              }
              label="Email"
              type="email"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
