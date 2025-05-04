document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Navigation active state
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const sections = document.querySelectorAll("section")

  // Smooth scrolling for navigation links
  function smoothScroll(links) {
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
        }
      })
    })
  }

  smoothScroll(navLinks)
  smoothScroll(mobileNavLinks)

  // Update active navigation link on scroll
  function updateActiveLink() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })

    mobileNavLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", updateActiveLink)

  // Initialize scroll spy on page load
  setTimeout(() => {
    updateActiveLink()
  }, 100)

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = themeToggle.querySelector("i")
  const htmlElement = document.documentElement

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "dark"

  // Apply saved theme
  if (savedTheme === "light") {
    htmlElement.classList.add("light-theme")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  }

  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("light-theme")

    // Update icon
    if (htmlElement.classList.contains("light-theme")) {
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
      localStorage.setItem("theme", "light")
    } else {
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
      localStorage.setItem("theme", "dark")
    }
  })

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".skill-category, .project-card, .experience-card, .about-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animate-fade-in")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)

  // Run once on load
  setTimeout(animateOnScroll, 300)
})
