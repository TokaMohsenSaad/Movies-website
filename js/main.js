let data = [];

function getMovies() {
  return fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=02771d094b89b3b448239febd5622c5d"
  )
    .then((response) => response.json())
    .then((response) => {
      data = response.results;
      addItems(data);
    })
    .catch((err) => console.error(err));
}

const recipeContainer = document.querySelector("#recipe-cont");

const addItems = (movies) => {
  recipeContainer.innerHTML = "";
  if (movies.length > 0) {
    movies.forEach((movie) => {
      const movieColumn = document.createElement("div");
      movieColumn.className = "col-md-4 mb-4";
      const movieBox = document.createElement("div");
      movieBox.className =
        "recipe-box make-pointer bg-light shadow-lg border border-1 border-muted rounded rounded-4 overflow-hidden position-relative";
      movieBox.innerHTML = `
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="w-100"
          alt=""
        />
        <div
          class="backdrop w-100 h-100 position-absolute top-0 start-0"
          style="background-image: url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}'); background-size: cover;"
        ></div>
        <div
          class="overlay text-white position-absolute w-100 text-center p-2"
        >
          <h2 class="fs-4 text-info text-capitalize">${movie.title}</h2>
          <p class="fs-5 text-warning">${movie.release_date}</p>
          <p class="fs-6">${movie.popularity}</p>
        </div>
      `;
      movieColumn.appendChild(movieBox);
      recipeContainer.appendChild(movieColumn);
    });
  }
};

document.querySelector("#searchButton").addEventListener("click", () => {
  const searchInput = document
    .querySelector("#searchInput")
    .value.toLowerCase();
  if (searchInput.length >= 3) {
    const filteredMovies = data.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput)
    );
    addItems(filteredMovies);
    document.querySelector("#backButton").style.display = "inline-block";
  } else {
    alert("Please enter at least 3 characters.");
  }
});

document.querySelector("#backButton").addEventListener("click", () => {
  addItems(data);
  document.querySelector("#backButton").style.display = "none";
});

getMovies();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const inputs = document.querySelectorAll("#contactForm input");
    let isValid = true;

    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        isValid = false;
        input.classList.add("is-invalid");
        input.nextElementSibling.style.display = "block";
      } else {
        input.classList.remove("is-invalid");
        input.nextElementSibling.style.display = "none";
      }
    });

    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      isValid = false;
      email.classList.add("is-invalid");
      email.nextElementSibling.style.display = "block";
    }

    const phone = document.getElementById("phone");
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone.value)) {
      isValid = false;
      phone.classList.add("is-invalid");
      phone.nextElementSibling.style.display = "block";
    }

    const age = document.getElementById("age");
    if (isNaN(age.value) || age.value.trim() === "" || age.value <= 0) {
      isValid = false;
      age.classList.add("is-invalid");
      age.nextElementSibling.style.display = "block";
    }

    const password = document.getElementById("password");
    const validatePassword = document.getElementById("validatePassword");
    if (
      password.value.trim() === "" ||
      password.value !== validatePassword.value
    ) {
      isValid = false;
      password.classList.add("is-invalid");
      validatePassword.classList.add("is-invalid");
      validatePassword.nextElementSibling.style.display = "block";
    }

    if (isValid) {
      inputs.forEach(function (input) {
        input.classList.remove("is-invalid");
        input.nextElementSibling.style.display = "none";
      });

      alert("Form submitted successfully!");

      inputs.forEach(function (input) {
        input.value = "";
      });
    }
  });

document.getElementById("fixedButton").addEventListener("click", function () {
  const menu = document.getElementById("menu");
  const fixedButton = document.getElementById("fixedButton");

  if (menu.style.left === "0px") {
    menu.style.animation = "slideOut 0.3s forwards";
    setTimeout(() => {
      menu.style.left = "-250px";
      fixedButton.style.left = "0";
    }, 300);
  } else {
    menu.style.left = "0";
    menu.style.animation = "slideIn 0.3s forwards";
    fixedButton.style.left = "250px";
  }
});
