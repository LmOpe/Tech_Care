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
  const rightSideBar = document.getElementById("right-side-bar");
  // Fetch data from the API
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
        UpdateRightSideBar(data[3]);
      })
      .catch((error) => console.error("Error:", error));
  }

  // Function to update list of patients in the UI
  function UpdatePatientsList(data) {
    dataListElement.innerHTML = "";

    const listItemsHtml = data
      .map(
        (item, index) => `
    <li class="flex justify-between items-center min-w-[270px] pr-4 pl-5 ${
      index === 3 && "bg-light-green-1"
    }">
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

  // Function to Update the
  // selected patient bio and the lab results in the UI
  
  function UpdateRightSideBar(data) {
    rightSideBar.innerHTML = "";

    const rightSideBarHtml = `<div class="w-full min-h-[740px] pl-4 flex flex-col justify-around items-center bg-white rounded-2xl">
      <div class="flex flex-col gap-6 items-center w-full">
        <img class="w-[200px] h-[200px]" src=${data.profile_picture} alt=${
      data.name
    } />
        <p class="font-extrabold text-2xl">${data.name}</p>
      </div>
      <div class="w-full flex flex-col gap-5">
        <div class="flex w-full gap-2 capitalize text-base">
          <img class="cursor-pointer" src="/assets/BirthIcon.svg" alt="Date of Birth" />
          <div class="flex flex-col justify-between items-start py-1">
            <p class="cursor-pointer font-normal">Date of Birth</p>
            <p class="text-grey-7 cursor-pointer">${data.date_of_birth}</p>
          </div>
        </div>
        <div class="flex w-full gap-2 capitalize text-base">
          <img class="cursor-pointer" src="/assets/FemaleIcon.svg" alt="Gender" />
          <div class="flex flex-col justify-between items-start py-1">
            <p class="cursor-pointer font-normal">Gender</p>
            <p class="text-grey-7 cursor-pointer">${data.gender}</p>
          </div>
        </div>
        <div class="flex w-full gap-2 capitalize text-base">
          <img class="cursor-pointer" src="/assets/PhoneIcon.svg" alt="Contact info." />
          <div class="flex flex-col justify-between items-start py-1">
            <p class="cursor-pointer font-normal">Contact Info.</p>
            <p class="text-grey-7 cursor-pointer">${data.phone_number}</p>
          </div>
        </div>
        <div class="flex w-full gap-2 capitalize text-base">
          <img class="cursor-pointer" src="/assets/PhoneIcon.svg" alt="Emergency Contacts" />
          <div class="flex flex-col justify-between items-start py-1">
            <p class="cursor-pointer font-normal">Date of Birth</p>
            <p class="text-grey-7 cursor-pointer">${data.emergency_contact}</p>
          </div>
        </div>
        <div class="flex w-full gap-2 capitalize text-base">
          <img class="cursor-pointer" src="/assets/InsuranceIcon.svg" alt="Insurance provider" />
          <div class="flex flex-col justify-between items-start py-1">
            <p class="cursor-pointer font-normal">Insurance Provider</p>
            <p class="text-grey-7 cursor-pointer">${data.insurance_type}</p>
          </div>
        </div>
      </div>
      <button class="bg-green rounded-[41px] py-[11px] px-[40px] font-normal text-base">
        Show All information
      </button>
    </div>
    <div
      class="w-full max-h-[296px] p-4 pb-0 flex flex-col justify-around items-center bg-white rounded-2xl"
    >
      <p class="font-extrabold text-2xl">Lab Results</p>
      <ul
        class="w-full pr-3 flex flex-col h-main items-center sidebar overflow-y-scroll gap-[5px] justify-between"
      >
        ${data.lab_results
          .map(
            (item, index) => `
    <li class="w-full cursor-pointer items-center p-4 flex justify-between h-[40px] ${
      index === 1 && "bg-grey-3"
    }">
    <p>${item}</p>
    <img class="h-5" src="/assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt=${`Download ${item}`}>
        </li>
  `
          )
          .join("")}
      </ul>
    </div>
    `;
    rightSideBar.innerHTML = rightSideBarHtml;
  }

  fetchData();
});
