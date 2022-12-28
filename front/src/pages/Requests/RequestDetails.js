import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Status from "../../components/Status";
import { ChevronLeft } from "react-feather";
import { Client } from "../../api";
import RequestAuditHistory from "./components/RequestAuditHistory";
var moment = require("moment");

export default function RequestDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [order, setOrder] = useState(null);
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
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return (
    <>
      {Boolean(order) && (
        <div>
          {/* Order Information Card */}
          <div className="justify-center flex mt-5">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-3/4">
              <div className="px-4 py-5 sm:px-6 grid sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Order Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and application.
                  </p>
                </div>
                <div className="sm:col-span-1 justify-end flex">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => navigate(-1)}
                  >
                    <ChevronLeft
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Back
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Customer name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.discord_name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.phone_number}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Product
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.product_line_name + " " + order.name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">SKU</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.hlj_ref}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Date Requested
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {moment(order.date_requested).format("DD/MM/YYYY HH:mm")}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <Status name={order.description} />
                    </dd>
                  </div>
                  <div className="sm:col-span-3">
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {order.notes}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          {/* Audit History Card */}
          <div className="justify-center flex mt-5">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-3/4">
              <div className="px-4 py-5 sm:px-6 grid sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Audit History
                  </h3>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <RequestAuditHistory id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
