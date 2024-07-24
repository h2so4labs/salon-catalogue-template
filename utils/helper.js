const formatKey = (key) => {
  return key
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDateHumanReadable = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const date = new Date();

const dummyData = [
  {
    userId: "user1",
    feedback: "The food was cold",
    createdAt: date,
  },
  {
    userId: "user2",
    feedback: "Poor service",
    createdAt: date,
  },
  {
    userId: "user3",
    feedback: "Too noisy",
    createdAt: date,
  },
  {
    userId: "user1",
    feedback: "The food was cold",
    createdAt: date,
  },
  {
    userId: "user2",
    feedback: "Poor service",
    createdAt: date,
  },
  {
    userId: "user3",
    feedback: "Too noisy",
    createdAt: date,
  },
  {
    userId: "user1",
    feedback: "The food was cold",
    createdAt: date,
  },
  {
    userId: "user2",
    feedback: "Poor service",
    createdAt: date,
  },
  {
    userId: "user3",
    feedback: "Too noisy",
    createdAt: date,
  },
  {
    userId: "user1",
    feedback: "The food was cold",
    createdAt: date,
  },
  {
    userId: "user2",
    feedback: "Poor service",
    createdAt: date,
  },
  {
    userId: "user3",
    feedback: "Too noisy",
    createdAt: date,
  },
  {
    userId: "user1",
    feedback: "The food was cold",
    createdAt: date,
  },
  {
    userId: "user2",
    feedback: "Poor service",
    createdAt: date,
  },
  {
    userId: "user3",
    feedback: "Too noisy",
    createdAt: date,
  },
];

module.exports = {
  formatKey,
  formatDateHumanReadable,
  dummyData,
};
