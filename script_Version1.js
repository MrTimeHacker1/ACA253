document.addEventListener("DOMContentLoaded", function () {
  // Greeting messages array
  const greetings = [
    "Welcome to my portfolio! 🚀",
    "Hello there! Thanks for visiting! 👋",
    "Great to see you here! ✨",
    "Welcome! Let's explore together! 🌟",
    "Hi! Ready to discover my journey? 🎯",
  ];

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-btn");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (theme === "dark") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  // Greeting message functionality
  const greetingModal = document.getElementById("greeting");
  const greetingText = document.getElementById("greeting-text");
  const closeGreeting = document.getElementById("close-greeting");

  // Show random greeting
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];
  greetingText.textContent = randomGreeting;

  // Auto close greeting after 3 seconds
  setTimeout(() => {
    greetingModal.style.display = "none";
  }, 3000);

  // Manual close greeting
  closeGreeting.addEventListener("click", () => {
    greetingModal.style.display = "none";
  });

  // Close greeting when clicking outside
  greetingModal.addEventListener("click", (e) => {
    if (e.target === greetingModal) {
      greetingModal.style.display = "none";
    }
  });

  // Read More functionality for courses
  const readMoreBtn = document.getElementById("read-more");
  const coursesFull = document.getElementById("courses-full");
  let isExpanded = false;

  readMoreBtn.addEventListener("click", () => {
    if (isExpanded) {
      coursesFull.style.display = "none";
      readMoreBtn.textContent = "Read More";
      isExpanded = false;
    } else {
      coursesFull.style.display = "block";
      readMoreBtn.textContent = "Read Less";
      isExpanded = true;
    }
  });

  // Edit Skills functionality
  const editBtn = document.getElementById("edit-skills");
  const modal = document.getElementById("edit-modal");
  const skillsEditor = document.getElementById("skills-editor");
  const saveBtn = document.getElementById("save-skills");
  const cancelBtn = document.getElementById("cancel-edit");
  const skillsContent = document.getElementById("skills-content");

  let originalSkillsContent = skillsContent.innerHTML;

  editBtn.addEventListener("click", () => {
    modal.style.display = "block";
    skillsEditor.value = getSkillsText();
  });

  saveBtn.addEventListener("click", () => {
    const newContent = skillsEditor.value;
    updateSkillsDisplay(newContent);
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    skillsEditor.value = "";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  function getSkillsText() {
    const categories = skillsContent.querySelectorAll(".skill-category");
    let text = "";
    categories.forEach((category) => {
      const title = category.querySelector("h3").textContent;
      const skills = Array.from(category.querySelectorAll(".skill-tag")).map(
        (tag) => tag.textContent
      );
      text += `${title}:\n${skills.join(", ")}\n\n`;
    });
    return text;
  }

  function updateSkillsDisplay(content) {
    const lines = content.split("\n").filter((line) => line.trim());
    let newHTML = "";
    let currentCategory = "";
    let currentSkills = [];

    lines.forEach((line) => {
      if (line.endsWith(":")) {
        if (currentCategory && currentSkills.length > 0) {
          newHTML += createSkillCategoryHTML(currentCategory, currentSkills);
        }
        currentCategory = line.slice(0, -1);
        currentSkills = [];
      } else if (line.trim()) {
        const skills = line
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill);
        currentSkills = currentSkills.concat(skills);
      }
    });

    if (currentCategory && currentSkills.length > 0) {
      newHTML += createSkillCategoryHTML(currentCategory, currentSkills);
    }

    if (newHTML) {
      skillsContent.innerHTML = newHTML;
    }
  }

  function createSkillCategoryHTML(category, skills) {
    const skillTags = skills
      .map((skill) => `<span class="skill-tag">${skill}</span>`)
      .join("");
    return `
            <div class="skill-category">
                <h3>${category}</h3>
                <div class="skill-tags">
                    ${skillTags}
                </div>
            </div>
        `;
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections for scroll animations
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Add hover effects to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to buttons
  document
    .querySelectorAll("button, .social-link, .project-link, .contact-method")
    .forEach((element) => {
      element.addEventListener("click", function (e) {
        // Create ripple effect
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button, .social-link, .project-link, .contact-method {
            position: relative;
            overflow: hidden;
        }
    `;
  document.head.appendChild(style);

  // Add typing effect to name
  const nameElement = document.querySelector(".name");
  const originalName = nameElement.textContent;
  nameElement.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalName.length) {
      nameElement.textContent += originalName.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after greeting disappears
  setTimeout(typeWriter, 3500);

  // Add particle effect to header (optional enhancement)
  function createParticle() {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float 3s ease-in-out infinite;
        `;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 3 + "s";

    const header = document.querySelector(".header");
    header.style.position = "relative";
    header.style.overflow = "hidden";
    header.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 3000);
  }

  // Create particles periodically
  setInterval(createParticle, 300);

  // Add float animation
  const floatStyle = document.createElement("style");
  floatStyle.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg);
                opacity: 1;
            }
            50% { 
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.5;
            }
        }
    `;
  document.head.appendChild(floatStyle);
});
