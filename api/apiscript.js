async function getProjects() {
  const username = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("result");

  if (username === "") {
    resultDiv.innerHTML = "Please enter a developer/team name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      resultDiv.innerHTML = "No projects found.";
      return;
    }

    resultDiv.innerHTML = data
      .slice(0, 6)
      .map((repo) => {
        const projectData = {
          username: username,
          name: repo.name,
          description: repo.description || "No description available",
          language: repo.language || "N/A",
        };

        return `
          <div class="project-result">
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description available"}</p>
            <p>Language: ${repo.language || "N/A"}</p>
            <button class="save-btn" onclick='saveProject(${JSON.stringify(
              projectData,
            )})'>Save</button>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    resultDiv.innerHTML = "Failed to retrieve projects.";
    console.error(error);
  }
}

function saveProject(data) {
  let saved = localStorage.getItem("projectData");
  saved = saved ? JSON.parse(saved) : [];

  const exists = saved.some((item) => item.name === data.name);

  if (exists) {
    alert("Already saved!");
    return;
  }

  saved.push(data);

  localStorage.setItem("projectData", JSON.stringify(saved));

  alert("Project saved!");
}
