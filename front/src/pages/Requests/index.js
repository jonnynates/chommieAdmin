import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "react-feather";
import Status from "../../components/Status";
import RequestDropdown from "./components/RequestDropdown";
import { ApiError, Client, DEFAULT_SERVER_ERROR_MESSAGE } from "../../api";
import orderStatuses from "../../utils/orderStatuses";
import RemoveOrderConfirmation from "./components/RemoveOrderConfirmation";
import QueueModal from "./components/QueueModal";
var moment = require("moment");

export default function Requests() {
  let location = useLocation();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    product_line: "",
    product_name: "",
  });
  const [searchString, setSearchString] = useState("");
  const [title, setTitle] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/requests") {
      fetchAllOrders();
      setTitle("Requests");
    } else if (location.pathname === "/new-requests") {
      fetchNewOrders();
      setTitle("New Requests");
    }
  }, []);

  const fetchAllOrders = () => {
    Client.getAllOrders()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setOrders(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const fetchNewOrders = () => {
    Client.getOrdersForStatus(orderStatuses.NewRequest.id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setOrders(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const filterOrders = useMemo(() => {
    if (!orders) {
      return [];
    }

    return orders.filter((o) => {
      var kit = o.product_line_name + " " + o.name;
      return (
        o.discord_name.toLowerCase().includes(searchString.toLowerCase()) ||
        kit.toLowerCase().includes(searchString.toLowerCase()) ||
        o.description.toLowerCase().includes(searchString.toLowerCase())
      );
    });
  }, [orders, searchString]);

  const deleteOrder = () => {
    try {
      Client.deleteOrder(currentOrder.id);

      setOrders(orders.filter((o) => o.id !== currentOrder.id));
    } catch (err) {
      if (err instanceof ApiError) {
        setServerErrorMessage(err.message);
      } else {
        setServerErrorMessage(DEFAULT_SERVER_ERROR_MESSAGE);
      }
    } finally {
      setDeleteOpen(false);
    }
  };

  const handleSelectProduct = (id, product_line, product_name) => {
    setCurrentProduct({ id, product_line, product_name });
  };

  return (
    <div>
      {Boolean(orders) && (
        <div className="mt-5 x-4 sm:px-6 lg:px-8">
          <RemoveOrderConfirmation
            open={deleteOpen}
            setOpen={setDeleteOpen}
            deleteOrder={deleteOrder}
          />
          <QueueModal
            open={queueOpen}
            setOpen={setQueueOpen}
            currentProduct={currentProduct}
          />
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

              <div className="relative mt-2 rounded-md shadow-sm w-56 border-gray-300 border-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="h-8 block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  autoComplete="off"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() => navigate("/orders/new")}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Request
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Customer Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          SKU
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date Requested
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Queue
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filterOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {order.discord_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.product_line_name + " " + order.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.hlj_ref}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {moment(order.date_requested).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {order.queue}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <Status name={order.description} />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <RequestDropdown
                              currentOrder={order}
                              setCurrentOrder={setCurrentOrder}
                              setCurrentProduct={handleSelectProduct}
                              setDeleteOpen={setDeleteOpen}
                              setQueueOpen={setQueueOpen}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
