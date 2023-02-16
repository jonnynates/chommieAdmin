import { useEffect, useState } from "react";
import { Check, Edit, Heart, ShoppingCart, DollarSign } from "react-feather";
import { Client } from "../../../api";
var moment = require("moment");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RequestAuditHistory({ id }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);

  useEffect(() => {
    if (id) {
      fetchOrderAuditHistory();
    }
  }, [id]);

  const fetchOrderAuditHistory = () => {
    Client.getOrderAuditHistory(id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setOrderHistory(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case "New Request":
        return <Edit className="h-5 w-5 text-white" aria-hidden="true" />;
      case "Backordered":
        return <Check className="h-5 w-5 text-white" aria-hidden="true" />;
      case "Ordered":
        return (
          <ShoppingCart className="h-5 w-5 text-white" aria-hidden="true" />
        );
      case "Reserved":
        return <Heart className="h-5 w-5 text-white" aria-hidden="true" />;
      case "Fulfilled":
        return <DollarSign className="h-5 w-5 text-white" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const renderIconBackgroundColour = (status) => {
    switch (status) {
      case "New Request":
        return "bg-lime-400";
      case "Backordered":
        return "bg-blue-400";
      case "Ordered":
        return "bg-gray-400";
      case "Reserved":
        return "bg-yellow-400";
      case "Fulfilled":
        return "bg-green-400";
      default:
        return null;
    }
  };

  return (
    <>
      {Boolean(orderHistory) && (
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {orderHistory.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== orderHistory.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          renderIconBackgroundColour(event.description),
                          "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                        )}
                      >
                        {renderStatusIcon(event.description)}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="text-sm text-red-500">
                            {event.discord_name}
                          </span>{" "}
                          updated the order status to {event.description}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={event.performed_at}>
                          {moment(event.performed_at).format("DD MMM YYYY")}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
