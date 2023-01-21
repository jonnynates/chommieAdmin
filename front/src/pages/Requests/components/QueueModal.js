import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Client } from "../../../api";
import Status from "../../../components/Status";
var moment = require("moment");

export default function QueueModal({ open, setOpen, currentProduct }) {
  const cancelButtonRef = useRef(null);
  const [queue, setQueue] = useState(null);

  console.log(currentProduct);

  useEffect(() => {
    if (currentProduct.id !== null) {
      getOrderQueue();
    }
  }, [open]);

  const getOrderQueue = () => {
    Client.getOrderQueue(currentProduct.id)
      .then((res) => res.json())
      .then(
        (result) => {
          setQueue(result);
        },
        (error) => {
          //   setIsLoaded(true);
          //   setError(error);
        }
      );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-2xl sm:p-6">
                <div className="sm:flex justify-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {currentProduct.product_line}{" "}
                      {currentProduct.product_name} Queue
                    </Dialog.Title>
                    {Boolean(queue) && (
                      <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Queue
                                    </th>
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
                                      Date Requested
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {queue.map((order, index) => (
                                    <tr key={order.id}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {index + 1}
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {order.discord_name}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {moment(order.date_requested).format(
                                          "DD/MM/YYYY HH:mm"
                                        )}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <Status name={order.description} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
