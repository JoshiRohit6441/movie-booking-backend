// business document query builder
export const businessDocumentQueryBuilder = async (query) => {
  const { search, status, is_deleted, is_required } = query;
  const queryParams = {};

  if (search && search.trim() !== "") {
    queryParams.document_name = { $regex: search, $options: "i" };
  }

  if (status && status != "all") {
    queryParams.status = status;
  }

  if (is_deleted && is_deleted != "all") {
    queryParams.deletedAt = is_deleted == "true" ? { $ne: null } : null;
  }

  if (is_required && is_required != "all") {
    queryParams.is_required = is_required == "true" ? true : false;
  }

  return queryParams;
};

// business document get all
export const getbusinessDocuments = async ({
  model,
  query,
  is_paginated = false,
  page = 0,
  limit = 0,
}) => {
  try {
    if (is_paginated) {
      const skip = (page - 1) * limit;
      const [data, count] = await Promise.all([
        model.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        model.countDocuments(query),
      ]);

      return { data, count };
    }
    const [data, count] = await Promise.all([
      model.find(query).sort({ createdAt: -1 }),
      model.countDocuments(query),
    ]);

    return { data, count };
  } catch (err) {
    throw err;
  }
};
