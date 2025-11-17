export const getApiType = (type: string) => {
  switch (type?.toLowerCase()) {
    case "application":
    case "applications":
      return "application";
    case "websites":
    case "website":
      return "website";
    case "telegram%20bot":
    case "telegrambot":
      return "telegrambot";
    case "ai%20models":
    case "aimodel":
      return "aimodel";
    default:
      return "website";
  }
};
