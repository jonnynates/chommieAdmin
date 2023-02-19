const orderStatuses = {
  Backordered: { id: 1, name: "Backordered" },
  Ordered: { id: 2, name: "Ordered" },
  InStock: { id: 3, name: "In Stock" },
  PreOrdered: { id: 4, name: "Pre Ordered" },
  Reserved: { id: 5, name: "Reserved" },
  Fulfilled: { id: 6, name: "Fulfilled" },
  Passed: { id: 7, name: "Passed" },
  NewRequest: { id: 8, name: "New Request" },
  Removed: { id: 0, name: "Removed" },
  WishlistedWithSupplier: { id: 10, name: "Wishlisted With Supplier" },
};

export default orderStatuses;
