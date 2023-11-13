import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { getPatientSearchDropdown } from "./useSearch";
import SearchableDropdown from "./SearchableDropdown";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

export default function App() {
  const [searchParameter, setSearchParameter] = useState("");
  const [dropdownDatum, setDropdownData] = useState([]);
  const [selectedDropdownData, setSelectedDropdownData] = useState({});
  useEffect(() => {
    getPatientSearchDropdown({ search: searchParameter }).then((data) => {
      setDropdownData(data);
    });
  }, [searchParameter]);
  return (
    <MainContent>
      <h1>Type to start search</h1>
      <SearchableDropdown
        searchParameter={searchParameter}
        setSearchParameter={(value) => setSearchParameter(value)}
        dropdownDatum={dropdownDatum.data}
        selectedDropdownData={selectedDropdownData}
        setSelectedDropdownData={setSelectedDropdownData}
      />
    </MainContent>
  );
}
