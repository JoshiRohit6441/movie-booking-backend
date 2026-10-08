// User Roles
export const UserRoles = {
  Admin: "admin",
  Vendor: "vendor",
  Customer: "customer",
  Staff: "staff",
};

export const UserRoleEnum = Object.values(UserRoles);

// User Status
export const UserStatus = {
  Active: "active",
  Inactive: "inactive",
  Suspended: "suspended",
};

export const UserStatusEnum = Object.values(UserStatus);

// Business Profile Status
export const BusinessProfileStatus = {
  Active: "active",
  Inactive: "inactive",
  Rejected: "rejected",
};

export const BusinessProfileStatusEnum = Object.values(BusinessProfileStatus);

// Business Profile Document Status
export const BusinessProfileDocumentStatus = {
  Active: "active",
  Inactive: "inactive",
};

export const BusinessProfileDocumentStatusEnum = Object.values(
  BusinessProfileDocumentStatus,
);
