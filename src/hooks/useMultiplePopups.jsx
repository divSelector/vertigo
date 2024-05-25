import usePopup from "./usePopup";

const useMultiplePopups = (count) => {
    const popups = Array.from({ length: count }, () => usePopup());
    return popups;
};

export default useMultiplePopups;
