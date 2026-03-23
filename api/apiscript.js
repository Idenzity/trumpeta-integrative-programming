async function getProjects() {
  const username = document.getElementById("nameInput").value;
  const resultDiv = document.getElementById("result");

  if (username === "") {
    resultDiv.innerHTML = "Please enter a developer name.";
    return;
  }

  try {
    // Get user profile
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    const userData = await userResponse.json();

    // Get repos (for count)
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );
    const repos = await repoResponse.json();

    if (userData.message === "Not Found") {
      resultDiv.innerHTML = "Developer not found.";
      return;
    }

    const developerData = {
      username: userData.login,
      avatar: userData.avatar_url,
      profile: userData.html_url,
      repoCount: repos.length,
    };

    resultDiv.innerHTML = `
      <div class="weather-result">
        <img src="${userData.avatar_url}" width="100" style="border-radius:50%; margin-bottom:10px;" />
        <h2>${userData.login}</h2>
        <p>Public Projects: ${repos.length}</p>
        <a href="${userData.html_url}" target="_blank">View Profile</a>
        <br/><br/>
        <button class="save-btn" onclick='saveDeveloper(${JSON.stringify(
          developerData,
        )})'>Save Developer</button>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Failed to retrieve developer data.";
    console.error(error);
  }
}

function saveDeveloper(data) {
  let saved = localStorage.getItem("developerData");
  saved = saved ? JSON.parse(saved) : [];

  const exists = saved.some((item) => item.username === data.username);

  if (exists) {
    alert("Developer already saved!");
    return;
  }

  saved.push(data);

  localStorage.setItem("developerData", JSON.stringify(saved));

  alert("Developer saved!");
}
