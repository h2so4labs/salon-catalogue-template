const {
  fetchOverviewData,
  fetchNegativeFeedback,
  fetchSchedulingOverview,
} = require("./utils/api");
const { generatePDF } = require("./utils/generatePdf");
const { paths } = require("./constants");

const main = async () => {
  const n = 7;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - n);

  try {
    const overview = await fetchOverviewData(startDate, endDate);
    const negativeFeedback = await fetchNegativeFeedback(startDate, endDate);
    const schedulingOverview = await fetchSchedulingOverview(
      startDate,
      endDate
    );

    const data = {
      overview,
      negativeFeedback,
      schedulingOverview,
    };

    generatePDF(data, n, startDate, endDate, paths);
    console.log("PDF Generated ✅");
  } catch (error) {
    console.error("Error generating PDF", error);
  }
};

main();
