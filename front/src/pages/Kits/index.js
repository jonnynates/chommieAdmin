import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "react-feather";
import { Client } from "../../api";

function Kits() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [kits, setKits] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchAllKits();
  }, []);

  const fetchAllKits = () => {
    Client.getAllKits()
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

  const filterKits = useMemo(() => {
    if (!kits) {
      return [];
    }

    return kits.filter((k) => {
      var kit = k.product_line_name + " " + k.name;
      return kit.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [kits, searchString]);
  return (
    <div>
      {Boolean(kits) && (
        <div className="mt-5 x-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Kits</h1>

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
                onClick={() => navigate("/kits/new")}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Kit
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Product Line
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Product Name
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
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filterKits.map((kit) => (
                        <tr key={kit.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {kit.product_line_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {kit.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {kit.hlj_ref}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {kit.price}
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

export default Kits;
