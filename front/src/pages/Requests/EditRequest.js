import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "../../api";
import orderStatuses from "../../utils/orderStatuses";

function EditRequest() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(1);
  const [note, setNote] = useState("");
  const statuses = Object.values(orderStatuses);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const fetchOrderDetails = () => {
    Client.getOrderDetail(id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setOrder(result);
          setStatus(result.status_id);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const updateOrder = async () => {
    const orderBody = {
      status_id: status,
      notes: note,
    };
    try {
      const response = await Client.updateOrder(id, orderBody);
      if (response.ok) {
        return navigate(-1);
      }
    } catch (err) {
      setError(err); // handle error
    }
  };

  return (
    <>
      {Boolean(order) && (
        <div className="mt-10 w-3/4 m-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Edit Order Details
                </h3>
                <p className="mt-1 text-sm text-gray-600">uwu</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={status}
                          label="Status"
                          onChange={handleChange}
                        >
                          {statuses.map((status) => (
                            <MenuItem value={status.id}>{status.name}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          Old status: {order.description}
                        </FormHelperText>
                      </FormControl>
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
                        defaultValue={order.notes}
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
                    onClick={updateOrder}
                  >
                    Update Order
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

export default EditRequest;
