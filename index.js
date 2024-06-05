// Function to encode credentials in Base64
function encodeCredentials(username, password) {
  const credentials = `${username}:${password}`;
  return btoa(credentials);
}

// Credentials are visible for the sake of development to avoid installation of too many libraries,
// we would usually store secrets in environment variables
const username = "coalition";
const password = "skills-test";
const encodedCredentials = encodeCredentials(username, password);

addEventListener("DOMContentLoaded", () => {
  const dataListElement = document.getElementById("patients-list");

  function fetchData() {
    fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        UpdatePatientsList(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  function UpdatePatientsList(data) {
    dataListElement.innerHTML = "";

    const listItemsHtml = data
      .map(
        (item) => `
    <li class="flex justify-between items-center min-w-[270px]">
      <div class="flex w-full items-center gap-2">
        <img
          class="cursor-pointer w-12 h-12"
          src="${item.profile_picture}"
          alt="${item.name}"
        />
        <div class="flex flex-col justify-between items-start py-1">
          <p class="cursor-pointer">${item.name}</p>
          <p class="text-grey-7 font-normal cursor-pointer">
           ${item.gender}, ${item.age}
          </p>
        </div>
      </div>
      <img
        class="cursor-pointer"
        src="/assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"
        alt="More details"
      />
    </li>
  `
      )
      .join("");

    dataListElement.innerHTML = listItemsHtml;
  }
  fetchData();
});
