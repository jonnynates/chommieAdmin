import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../api";
import UserComboBox from "./components/UserComboBox";

function AddNewRequest() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [kits, setKits] = useState([]);
  const [kit, setKit] = useState("");
  const [product_lines, setProductLines] = useState([]);
  const [product_line, setProductLine] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const filter = createFilterOptions();

  useEffect(() => {
    fetchUsers();
    fetchAllProductLines();
  }, []);

  useEffect(() => {
    if (product_line !== "") {
      fetchKitsByProductLine();
    }
  }, [product_line]);

  const fetchUsers = () => {
    Client.getAllUsers()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const fetchKitsByProductLine = () => {
    Client.getKitsByProductLine(product_line.product_line_name)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setKits(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

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

  const createOrder = async () => {
    const orderBody = {
      user_id: customer.id,
      product_id: kit.id,
      notes: note,
    };
    try {
      const response = await Client.createNewOrder(orderBody);
      if (response.ok) {
        return navigate(-1);
      }
    } catch (err) {
      setError(err); // handle error
    }
  };

  return (
    <>
      {Boolean(kits) && Boolean(users) && (
        <div className="mt-10 w-3/4 m-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Order Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  If the customer is not in the database, type out their name
                  and click add. This will take you to a form to add the new
                  user
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <UserComboBox
                        users={users}
                        customer={customer}
                        setCustomer={setCustomer}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Autocomplete
                        disablePortal
                        id="product-line-combo-box"
                        options={product_lines}
                        getOptionLabel={(option) => option.product_line_name}
                        onChange={(event, newValue) => {
                          setProductLine(newValue);
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product Lines"
                            required
                          />
                        )}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <Autocomplete
                        disablePortal
                        id="product-line-combo-box"
                        options={kits}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          setKit(newValue);
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Products" required />
                        )}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <p className="text-md font-medium leading-6 text-gray-500">
                        Add additional notes
                      </p>
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block w-full rounded-md border-solid border border-gray-300 focus:border-gray-300 focus:ring-gray-300 focus-visible:outline-none p-3 resize-none"
                        defaultValue={""}
                        onChange={(event) => {
                          setNote(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={createOrder}
                  >
                    Create Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNewRequest;
