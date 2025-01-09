import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_TRANSACTION_DETAILS } from "../sevices";

type ToastType = "success" | "info" | "warning" | "error";

export const showToast = (message: string, type: ToastType): void => {
  const options: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
  };

  toast[type](message, options);
};

export const handleCustomError = async (error: any) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    if (
      status === 401 &&
      data.message === "Unauthorized"
    ) {
      await localStorage.removeItem("access_token");
      await localStorage.removeItem("user");
      showToast("Try after Logging in", "error");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
      return;
    }

    const errorMessage = data.message || "An error occurred";
    showToast(errorMessage, "error");
  } else if (error.message) {
    showToast(error.message, "error");
  } else {
    showToast("An unexpected error occurred", "error");
  }
};

export const updateTransactionDetails = async (transactionId: string, functionName: string, eventName: string, reworkBody?: any) => {
  try {
    let body = {
      transactionId: transactionId,
      event: eventName,
      functionName: functionName
    }
    if (reworkBody) {
      body = {
        ...body,
        ...reworkBody
      }
    }
    // Adding a 5-second delay using setTimeout
    // await new Promise(resolve => setTimeout(resolve, 8000));
    await UPDATE_TRANSACTION_DETAILS(body)
  } catch (error) {
    console.log('Error in Posting Transaction Details', error);
  }
}
export const logout = async () => {
  try {
    await localStorage.removeItem("access_token");
    await localStorage.removeItem("user");
    showToast("Logout successfull", "success");
    setTimeout(() => {
      window.location.href = "/signin";
    }, 2500);
    return "logout";
  } catch (error) {
    handleCustomError(error);
  }
};

export const getFileNameFromUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    const fileName = urlObject.pathname.split("/").pop();
    return fileName;
  } catch (error) {
    console.log(error, "Error in extracting file name");
  }
}

export const getCurrentDate = (type: any, selectedDate?: Date) => {
  const today = new Date();
  if (type === "DATETIME") {
    let dateTime;
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      dateTime = selectedDate.toISOString().slice(0, -8);
    } else {
      dateTime = today.toISOString().slice(0, -8);
    }
    return dateTime;
  } else {
    let minDate;
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      minDate = selectedDate;
    } else {
      minDate = today;
    }
    return minDate.toISOString().split("T")[0];
  }
};

export const convertDurationToDays = (duration: any, durationUnit: any) => {
  const daysInWeek = 7;
  const daysInMonth = 30; // Assuming a month has 30 days
  const daysInYear = 365; // Assuming a year has 365 days

  let totalDays = 0;
  switch (durationUnit) {
    case 'Year':
      totalDays += duration * daysInYear;
      break;
    case 'Months':
      totalDays += duration * daysInMonth;
      break;
    case 'Weeks':
      totalDays += duration * daysInWeek;
      break;
    case 'Days':
      totalDays += duration;
      break;
    default:
      console.error('Invalid duration unit');
  }

  return totalDays;
}

export const getDisplayNameForRoles = (role: string) => {
  switch (role?.toUpperCase()) {
    case 'CP':
      return 'Provider';
    case 'IP':
      return 'Individual';
    case 'PURCHASER':
      return 'Purchaser';
    default:
      return role?.toLowerCase()
  }
}

export const getNumeratorDenominator = (percentage: any) => {
  // Parse the input as a float
  const decimal = parseFloat(percentage) / 100;

  // Find the number of decimal places
  const decimalStr = decimal.toString();
  const decimalPlaces = decimalStr.indexOf('.') !== -1 ? decimalStr.split('.')[1].length : 0;

  // Calculate the denominator based on the number of decimal places
  const denominator = Math.pow(10, decimalPlaces);

  // Calculate the numerator by multiplying the decimal by the denominator
  const numerator = decimal * denominator;

  // Return an object with numerator and denominator
  return {
    numerator: numerator,
    denominator: denominator
  };
}