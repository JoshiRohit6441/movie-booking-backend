import {
  businessDocumentStatusChangeService,
  createBusinessDocumentService,
  deleteRestoreBusinessDocumentService,
  getAllBusinessDocumentService,
  getSingleBusinessDocumentService,
  updateBusinessDocumentService,
} from "../../service/BusinessDocumentService.js";

// create business document controller
export const createBusinessDocument = async (req, resp) => {
  const response = await createBusinessDocumentService(req, resp);
  return response;
};

// update business document controller
export const updateBusinessDocument = async (req, resp) => {
  const response = await updateBusinessDocumentService(req, resp);
  return response;
};

// get single business document controller
export const getSingleBusinessDocument = async (req, resp) => {
  const response = await getSingleBusinessDocumentService(req, resp);
  return response;
};

// get all business document controller
export const getAllBusinessDocument = async (req, resp) => {
  const response = await getAllBusinessDocumentService(req, resp);
  return response;
};

// update business document status controller
export const updateBusinessDocumentStatus = async (req, resp) => {
  const response = await businessDocumentStatusChangeService(req, resp);
  return response;
};

// delete/restore business document controller
export const deleteRestoreBusinessDocument = async (req, resp) => {
  const response = await deleteRestoreBusinessDocumentService(req, resp);
  return response;
};
