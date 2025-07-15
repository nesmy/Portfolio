const GITHUB_USERNAME = "nesmy";
    let currentLang = localStorage.getItem("lang") || "en";

    const translations = {
      fr: {
        about: "À propos de moi",
        aboutText: "Je suis un self-taught programmeur expérimenté en développement web full-stack, moteurs de jeu, systèmes d'exploitation et intégration d'IA. Je crée des sites web personnalisés, des outils de développement et des systèmes 3D de A à Z en utilisant des technologies comme HTML, Tailwind, Astro et C++. Qu'il s'agisse de déployer une application web dynamique ou de créer un noyau bas niveau, j'aime résoudre des problèmes complexes avec du code propre.",
        skills: "Compétences",
        projects: "Projets",
        resume: "Mon CV",        
        contactText: "Vous avez un projet ou souhaitez simplement dire bonjour ?",
        social: "Comment me trouver",
        contact: "Contacter Moi",
        send: "Envoyer Message",
        nom: "Nom"
      },
      en: {
        about: "About Me",
        aboutText: "I’m a self-taught programmer with experience in full-stack web development, game engines, operating systems, and AI integration. I build custom websites, developer tools, and 3D systems from the ground up using technologies like HTML, Tailwind, Astro, and C++. Whether it's deploying a dynamic web app or building a low-level kernel, I enjoy solving tough problems with clean code.",
        skills: "Skills",
        projects: "Projects",
        resume: "My Resume",
        contact: "Contact Me",
        contactText: "Have a project or just want to say hi?",
        social: "How to find me",
        send: "Send Message",
        nom: "Name"
      }
    };

    function applyTranslations() {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLang] && translations[currentLang][key]) {
          el.textContent = translations[currentLang][key];
        }
      });
    }

    function toggleLanguage() {
      currentLang = currentLang === "en" ? "fr" : "en";
      localStorage.setItem("lang", currentLang);
      applyTranslations();
    }

    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.classList.contains("dark");
      if (isDark) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }

    function openModal(title, description, images = [], link = "#") {
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalDesc").textContent = description;
      document.getElementById("modalLink").href = link;

      const gallery = document.getElementById("modalGallery");
      gallery.innerHTML = "";
      images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "w-20 h-20 object-cover rounded";
        gallery.appendChild(img);
      });

      document.getElementById("projectModal").classList.remove("hidden");
    }

    function closeModal() {
      document.getElementById("projectModal").classList.add("hidden");
    }

    async function fetchGitHubRepos() {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
      const data = await res.json();
      const container = document.getElementById("githubProjects");

      data.slice(0, 6).forEach(repo => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-gray-700 p-6 rounded shadow cursor-pointer hover:shadow-xl transition";
        card.onclick = () => openModal(repo.name, repo.description || "No description", [], repo.html_url);
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