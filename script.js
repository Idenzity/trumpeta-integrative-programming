//default users for testing
if (!localStorage.getItem("users")) {
  const defaultUsers = [
    {
      name: "Ralph",
      email: "ralph@gmail.com",
      password: "admin123",
      role: "Admin"
    },
    {
      name: "Steve",
      email: "steve@gmail.com",
      password: "123456",
      role: "User"
    }
  ];

  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// admin page protection
document.addEventListener("DOMContentLoaded", function () {

  const role = localStorage.getItem("userRole");

  if (
    window.location.pathname.includes("admin") ||
    window.location.pathname.includes("manage") ||
    window.location.pathname.includes("add-user")
  ) {
    if (role !== "Admin") {
      alert("Access denied. Admins only.");
      window.location.href = "login.html";
    }
  }

});

// login system
document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");

  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("userRole", user.role);

    if (user.role === "Admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "profile.html";
    }

  });

});

// signup system
document.addEventListener("DOMContentLoaded", function () {

  const signupForm = document.getElementById("signupForm");

  if (!signupForm) return;

  signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword =
      document.getElementById("signupConfirmPassword").value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    users.push({
      name: name,
      email: email,
      password: password,
      role: "User"
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please login.");
    window.location.href = "login.html";

  });

});

// logout
function logout() {

  localStorage.removeItem("userRole");
  window.location.href = "login.html";

}

// load user into table
document.addEventListener("DOMContentLoaded", function () {

  const table = document.getElementById("userTable");

  if (!table) return;

  const users = JSON.parse(localStorage.getItem("users"));

  table.innerHTML = "";

  users.forEach((user, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    table.appendChild(row);

  });

  attachDeleteButtons();

});

// delete user
function attachDeleteButtons() {

  const buttons = document.querySelectorAll(".delete-btn");

  buttons.forEach((btn, index) => {

    btn.addEventListener("click", function () {

      let users = JSON.parse(localStorage.getItem("users"));

      users.splice(index, 1);

      localStorage.setItem("users", JSON.stringify(users));

      location.reload();

    });

  });

}

// add user
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("addUserForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users"));

    users.push({
      name: name,
      email: email,
      password: "123456",
      role: role
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("User added!");

    location.reload();

  });

});