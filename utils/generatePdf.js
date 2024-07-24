const PDFDocument = require("pdfkit");
const fs = require("fs");

const { formatKey, formatDateHumanReadable } = require("./helper");

const generatePDF = (data, n, startDate, endDate, paths) => {
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(paths[3]);
  doc.pipe(writeStream);

  doc.registerFont("Roboto", paths[1]);
  doc.registerFont("Roboto-Bold", paths[2]);

  let pageNumber = 1;

  const drawHeader = () => {
    doc
      .fontSize(10)
      .fillColor("#003366")
      .font("Roboto-Bold")
      .text("Customer Insights Analysis", 50, 20)
      .text(`Page ${pageNumber}`, 130, 20, { align: "right" });

    doc
      .moveDown()
      .rect(50, doc.y, doc.page.width - 100, 1)
      .fillAndStroke("black", "black");

    doc.moveDown(2);
    pageNumber++;
  };

  const drawFooter = (height) => {
    const footerY = height + 30;
    doc
      .moveDown()
      .rect(50, footerY - 15, doc.page.width - 100, 1)
      .fillAndStroke("black", "black");

    doc
      .fontSize(12)
      .fillColor("black")
      .text("© 2024 H2SO4 Labs. All rights reserved.", 50, footerY, {
        align: "center",
        link: "https://h2so4labs.com",
      })
      .text("Website: https://h2so4labs.com", {
        align: "center",
        link: "https://h2so4labs.com",
      })
      .text("Contact: email@example.com | +1234567890", {
        align: "center",
        link: "mailto:email@example.com",
      });
  };

  const addPage = () => {
    doc.addPage();
    drawHeader();
  };

  const addSection = (title, content) => {
    const col1Width = (doc.page.width - 100) / 2.5;
    const col2Width = (doc.page.width - 100) / 4;

    if (doc.y > doc.page.height - 100) {
      addPage();
    }

    doc
      .fontSize(18)
      .fillColor("#003366")
      .font("Roboto-Bold")
      .text(title, 50, doc.y + 10, { align: "left", lineGap: 1.15 });

    doc.moveDown();

    const contentArray = content
      .split("\n")
      .map((line) => line.split(":").map((item) => item.trim()));

    contentArray.forEach(([key, value]) => {
      if (doc.y > doc.page.height - 100) {
        addPage();
      }

      const rowTop = doc.y;

      doc
        .fontSize(12)
        .fillColor("black")
        .font("Roboto")
        .text(key, 90, rowTop, { width: col1Width })
        .text(value, 95 + col1Width, rowTop, {
          width: col2Width,
        });

      doc
        .rect(50, rowTop - 3, col1Width, 21)
        .rect(50 + col1Width, rowTop - 3, col2Width, 21)
        .stroke();

      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    if (doc.y > doc.page.height - 100) {
      addPage();
    }
  };

  const addTableSection = (title, feedbacks) => {
    if (doc.y > doc.page.height - 100) {
      addPage();
    }

    doc
      .fontSize(18)
      .fillColor("#003366")
      .font("Roboto-Bold")
      .text(title, 50, doc.y + 10);
    doc.y += 30;
    const headerY = doc.y;

    doc
      .fontSize(12)
      .fillColor("#003366")
      .font("Roboto-Bold")
      .text("User Id", 80, headerY, { width: 100 })
      .text("Feedback", 260, headerY, { width: 250 })
      .text("Average Ratings", 430, headerY, { width: 150 });

    doc
      .rect(50, headerY - 5, 100, 28)
      .rect(150, headerY - 5, 250, 28)
      .rect(400, headerY - 5, 150, 28)
      .stroke();

    doc.y += 10;

    const col1Width = 100;
    const col2Width = 250;
    const col3Width = 150;

    feedbacks.forEach((feedback) => {
      if (doc.y + 15 > doc.page.height - 100) {
        addPage();
      }

      const rowTop = doc.y;

      const formatRatings = (ratings) => {
        let ratingsArray;
        try {
          ratingsArray = JSON.parse(ratings);
        } catch (e) {
          return "Invalid ratings format";
        }

        if (Array.isArray(ratingsArray)) {
          return ratingsArray.slice(0, 1).map((rating) => {
            const [key, value] = Object.entries(rating)[0];
            return `${formatKey(key)}: ${value}`;
          });
        } else if (typeof ratingsArray === "object") {
          return Object.entries(ratingsArray)
            .map(([key, value]) => `${formatKey(key)}: ${value}`)
            .join("\n");
        }

        return "Invalid ratings format";
      };

      const formattedRatings = formatRatings(feedback.cRatings);

      doc
        .fontSize(12)
        .fillColor("black")
        .font("Roboto")
        .text(feedback.iSno, 50, rowTop, {
          width: col1Width,
          align: "center",
        })
        .text(formattedRatings, 170, rowTop, {
          width: col2Width,
          align: "justify",
        })
        .text(feedback.averageRating, 400, rowTop, {
          width: col3Width,
          align: "center",
        });

      doc
        .rect(50, rowTop - 2, col1Width, 20)
        .rect(150, rowTop - 2, col2Width, 20)
        .rect(400, rowTop - 2, col3Width, 20)
        .stroke();

      doc.y += 5;
    });

    doc.y += 10;

    if (doc.y > doc.page.height - 100) {
      addPage();
    }
  };

  drawHeader();

  doc.image(paths[0], 270, doc.y, { width: 80 });
  doc
    .fillColor("blue")
    .text("H2SO4 Portal", 280, doc.y + 90, { link: "https://h2so4labs.com" });

  doc
    .fillColor("black")
    .fontSize(26)
    .text(`Customer Insights Analysis`, 150, doc.y + 10, {
      align: "left",
    })
    .fontSize(18)
    .text("H2SO4 Labs", 260, doc.y + 10)
    .fontSize(12)
    .text(
      `From ${formatDateHumanReadable(startDate)} to ${formatDateHumanReadable(
        endDate
      )}`,
      220,
      doc.y + 10
    );

  addSection(
    "Client",
    `Client Name: XYZ \nReport Date: ${formatDateHumanReadable(
      new Date()
    )} \nPrepared By: H2SO4`
  );

  addSection(
    "Feedback Overview",
    `Total Feedbacks Received: ${data.negativeFeedback.data.total}\nOverall Average: ${data.overview.data.overall_average}`
  );

  addSection(
    "Metrics",
    data.overview
      ? "" +
          Object.entries(data.overview.data.metrics)
            .map(([key, value]) => `\t${formatKey(key)} : ${value}`)
            .join("\n")
      : "No feedback overview data available."
  );

  if (
    data.negativeFeedback.data &&
    data.negativeFeedback.data.feedbacks &&
    data.negativeFeedback.data.feedbacks.length > 0
  ) {
    addTableSection(
      "Negative Feedbacks From User",
      data.negativeFeedback.data.feedbacks
    );
  }

  addSection(
    "Scheduling Overview",
    data.schedulingOverview.data
      ? `Customers Contacted: ${data.schedulingOverview.data.customersContacted}\n` +
          `Customers Retained: ${data.schedulingOverview.data.customersRetained}`
      : "No scheduling overview data available."
  );

  drawFooter(doc.y);

  doc.end();

  writeStream.on("finish", () => {});
  writeStream.on("error", (err) => {});
};

module.exports = { generatePDF };
