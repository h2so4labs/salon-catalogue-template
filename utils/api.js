const axios = require("axios");

const fetchOverviewData = async (startDate, endDate) => {
  const response = await axios.post(
    "https://brownbackend.h2so4labs.com/feedback/v3/response/get/overview",
    { startDate, endDate }
  );
  return response.data;
};

const fetchNegativeFeedback = async (startDate, endDate) => {
  const response = await axios.post(
    "https://brownbackend.h2so4labs.com/feedback/v3/response/get/negative",
    { offset: 0, limit: 10 }
  );
  return response.data;
};

const fetchSchedulingOverview = async (startDate, endDate) => {
  const response = await axios.post(
    "https://brownbackend.h2so4labs.com/mass/message/v2/scheduling/overview",
    { startDate, endDate }
  );
  return response.data;
};

module.exports = {
  fetchOverviewData,
  fetchNegativeFeedback,
  fetchSchedulingOverview,
};
