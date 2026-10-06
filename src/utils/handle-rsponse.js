import moment from "moment";

export default function handleResponse(statusCode, message, data, res) {
  try {
    res.status(statusCode).json({
      http_status_code: statusCode,
      data: data,
      message,
      timestamp: moment().toISOString(),
    });
  } catch (err) {
    console.log(err);
  }
}
