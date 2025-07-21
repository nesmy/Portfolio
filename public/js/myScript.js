const GITHUB_USERNAME = "nesmy";
   

function openModal(title, readme = "") {
      document.getElementById("modalTitle").textContent = title;
      const baseUrl = `https://raw.githubusercontent.com/nesmy/${title}/main/README.md`;
      const rendered = marked.parse(readme || "No README available.");
      const owner = "nesmy";
      const repo = title;
      const branch = "main";
      const withImgFix = rendered.replace(/<img src=\"(.*?)\"/g, (match, src) => {
        if (/^https?:\/\//.test(src)) return match;
        return `<img src=\"https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${src.replace(/^\.\/?/, '')}\"`;
      });
      document.getElementById("modalDesc").innerHTML = withImgFix;
      document.getElementById("projectModal").classList.remove("hidden");
    }
function closeModal() {
    document.getElementById("projectModal").classList.add("hidden");
}
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
}
    function toggleLanguage() {
      const toggle = document.getElementById("langToggle");
      const toLang = toggle.textContent === "FR" ? "fr" : "en";
      document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.dataset[toLang];
      });
      toggle.textContent = toLang.toUpperCase() === "FR" ? "EN" : "FR";
    }

    async function fetchGitHubRepos() {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
      const data = await res.json();
      const container = document.getElementById("githubProjects");

      data.slice(0, 6).forEach(repo => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-gray-700 p-6 rounded shadow cursor-pointer hover:shadow-xl transition";
          card.onclick = async () => {
	      try {
		  const readmeRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
                  headers: { Accept: "application/vnd.github.v3.raw" }
                  });
		  const readmeText = await readmeRes.text();
                openModal(repo.name, readmeText);
		  
	      } catch(e){		  
		  openModal(repo.name, repo.description || "No description");
	      }
	      
	  };
	  
        card.innerHTML = `
          <h3 class="text-xl font-semibold mb-2">${repo.name}</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-2">${repo.description || "No description"}</p>
          <span class="text-green-500">Click for details</span>
        `;
        container.appendChild(card);
      });
    }

    fetchGitHubRepos();
    applyTranslations();
