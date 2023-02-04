import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDown, Menu as MenuBar, X } from "react-feather";
import logo from "./assets/ChommieBot.png";
import useLocalStorage, { TOKEN_STORAGE_KEY } from "./hooks/useLocalStorage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const location = useLocation();
  const [tokenInStorage, setTokenInStorage] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null
  );
  const [user, setUser] = useLocalStorage("user", null);

  const [navigation, setNavigation] = useState([
    { name: "New Requests", href: "/new-requests", current: false },
    { name: "Requests", href: "/requests", current: true },
    { name: "Stats", href: "/home", current: false },
    { name: "Kits", href: "/kits", current: false },
    { name: "Customers", href: "/users", current: false },
  ]);

  useEffect(() => {
    const newNav = [...navigation];

    const isRootPath = location.pathname === "/new-requests";

    if (isRootPath) {
      newNav.forEach((nn) => {
        if (nn.href === "/new-requests") {
          nn.current = true;
        } else {
          nn.current = false;
        }
      });
    } else {
      newNav.forEach((nn) => {
        if (
          nn.href !== "/new-requests" &&
          location.pathname.includes(nn.href)
        ) {
          nn.current = true;
        } else {
          nn.current = false;
        }
      });
    }
    setNavigation(newNav);
  }, [location]);

  const signOut = () => {
    setTokenInStorage(null);
    setUser(null);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuBar className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center h-12">
                  <h1 className="px-3 py-2 rounded-md text-sm font-medium text-white leading-none">
                    ChommieAdmin
                  </h1>
                  <img
                    src={logo}
                    alt="Logo"
                    className="block h-8 w-auto lg:hidden"
                  />
                  <img
                    src={logo}
                    alt="Logo"
                    className="hidden h-12 w-auto lg:block"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ">
                      {user.discord_name}
                      <ChevronDown className="h-3" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={signOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
