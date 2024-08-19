export const getCurrentCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(
            new Error("Unable to retrieve your location: " + error.message)
          );
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const fetchCoordinates = async () => {
  try {
    const { latitude, longitude } = await getCurrentCoordinates();
    return { latitude, longitude };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
  }
};
