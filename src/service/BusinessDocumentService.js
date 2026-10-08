import mongoose from "mongoose";
import BusinessProfileDocument from "../model/BusinessProfileDocumentSchema.js";
import handleResponse from "../utils/handle-rsponse.js";
import {
  businessDocumentQueryBuilder,
  getbusinessDocuments,
} from "../utils/businessDocumentHelper.js";
import { getDbQueryById } from "../utils/helper-function.js";

// create business document service
export const createBusinessDocumentService = async (req, resp) => {
  try {
    const { document_name, is_required, status } = req.body;
    const document = await BusinessProfileDocument.findOne({
      document_name: document_name.toLowerCase(),
    });

    if (document)
      return handleResponse(409, "Document already exists", {}, resp);

    await BusinessProfileDocument.create({
      document_name: document_name.toLowerCase(),
      is_required,
      status,
    });
    return handleResponse(201, "Document created successfully", {}, resp);
  } catch (err) {
    return handleResponse(500, err?.message, {}, reso);
  }
};

// update business document service
export const updateBusinessDocumentService = async (req, resp) => {
  try {
    const { id } = req.params;
    const { document_name, is_required, status } = req.body;

    const existingDocument = await BusinessProfileDocument.findOne({
      document_name: document_name.toLowerCase(),
      _id: { $ne: new mongoose.Types.ObjectId(id) },
    });

    if (existingDocument)
      return handleResponse(409, "Document already exists", {}, resp);

    await BusinessProfileDocument.findByIdAndUpdate(id, {
      document_name: document_name.toLowerCase(),
      is_required,
      status,
    });
    return handleResponse(200, "Document updated successfully", {}, resp);
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// get single business document service
export const getSingleBusinessDocumentService = async (req, resp) => {
  try {
    const { id } = req.params;
    const document = await getDbQueryById({
      model: BusinessProfileDocument,
      id,
      fields: "",
    });
    return handleResponse(200, "Document fetched successfully", document, resp);
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// get all business document service
export const getAllBusinessDocumentService = async (req, resp) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const query = await businessDocumentQueryBuilder(req.query);

    const { data, count } = await getbusinessDocuments({
      model: BusinessProfileDocument,
      query,
      is_paginated: req.query.is_paginated === "true",
      page,
      limit,
    });

    const paginatedData = {
      data,
      pagination: {
        current_page: req.query.is_paginated === "true" ? page : 1,
        total_pages: Math.ceil(count / limit),
        total_items: count,
        page_size: limit,
      },
    };

    return handleResponse(
      200,
      "Documents fetched successfully",
      paginatedData,
      resp,
    );
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// business document status change
export const businessDocumentStatusChangeService = async (req, resp) => {
  try {
    const { id } = req.params;

    const document = await BusinessProfileDocument.findById(id);

    if (!document) return handleResponse(404, "Document not found", {}, resp);

    document.status = document.status === "active" ? "inactive" : "active";
    await document.save();

    return handleResponse(
      200,
      "Document status changed successfully",
      {},
      resp,
    );
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};

// delete/restore business document service
export const deleteRestoreBusinessDocumentService = async (req, resp) => {
  try {
    const { id } = req.params;

    const document = await BusinessProfileDocument.findById(id);

    if (!document) return handleResponse(404, "Document noty found", {}, resp);

    const isDeleted = document.deletedAt == null ? false : true;

    if (isDeleted) {
      document.deletedAt = null;
      await document.save();
      return handleResponse(200, "Document restored successfully", {}, resp);
    }
    document.deletedAt = new Date();
    await document.save();
    return handleResponse(200, "Document deleted successfully", {}, resp);
  } catch (err) {
    return handleResponse(500, err?.message, {}, resp);
  }
};
