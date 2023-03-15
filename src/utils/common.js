import { useIndexData } from "@/store";
const indexDataStore = useIndexData();
export const handleGetIndexData = () => {
  return indexDataStore.getPingData().then((res) => {
    if (res && res.length) {
      return res
    } else {
        return []
    }
  });
};
