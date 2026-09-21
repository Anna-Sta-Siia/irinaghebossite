import { dataServices } from "../assets/data/dataServices";

export const findServiceBySlug = (serviceSlug) => {
  if (!serviceSlug) {
    return null;
  }

  for (const [needId, needData] of Object.entries(
    dataServices
  )) {
    const service = needData.services.find(
      (currentService) =>
        currentService.id === serviceSlug
    );

    if (service) {
      return {
        ...service,
        needId,
      };
    }
  }

  return null;
};