export async function getPatientSearchDropdown({
  page = 1,
  pageSize = 5,
  sort = "descending",
  sortParameter = "fullName",
  search,
}) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer {{token}}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const URL_WITH_DATA = `http://192.168.21.85:8080/api/v1/patients/search-dropdown?page=${page}&pageSize=${pageSize}&sort=${sort}&sortParameter=${sortParameter}&search=${search}`;
  try {
    const response = await fetch(URL_WITH_DATA, requestOptions);
    const body = await response.json();
    if (response.status == 200) {
      return body;
    } else throw new Error(body.message);
  } catch (error) {
    if (error != null && typeof error.message === "string")
      throw new Error(error.message);
    throw new Error("Something went wrong");
  }
}
