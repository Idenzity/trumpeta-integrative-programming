// for login validation
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (email === "" || password === "") {
        e.preventDefault();
        alert("All fields are required.");
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        e.preventDefault();
        alert("Password must be at least 6 characters long.");
        return;
      }
    });
  }
});

// for signup validation
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const confirmPassword = document
        .getElementById("signupConfirmPassword")
        .value.trim();

      if (!name || !email || !password || !confirmPassword) {
        e.preventDefault();
        alert("All fields are required.");
        return;
      }

      if (name.length < 3) {
        e.preventDefault();
        alert("Full Name must be at least 3 characters long.");
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        e.preventDefault();
        alert("Password must be at least 6 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        e.preventDefault();
        alert("Passwords do not match.");
        return;
      }
    });
  }
});

// for manage data delete option
function updateIDs() {
  const rows = document.querySelectorAll("#userTable tr");

  rows.forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });
}
function addDeleteFunction(button) {
  button.addEventListener("click", function () {
    const row = this.parentElement.parentElement;
    row.remove();

    updateIDs();
  });
}
document.querySelectorAll(".delete-btn").forEach((button) => {
  addDeleteFunction(button);
});
