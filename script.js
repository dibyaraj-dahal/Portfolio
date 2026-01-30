const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

function updateActiveLink() {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ===========================
// Mobile Menu Toggle
// ===========================
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// ===========================
// Scroll-based Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections except hero
const sectionsToAnimate = document.querySelectorAll(".about, .services, .portfolio, .experience, .contact")
sectionsToAnimate.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Animate service cards
const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  card.style.transitionDelay = `${index * 0.1}s`
  observer.observe(card)
})

// Animate portfolio items
const portfolioItems = document.querySelectorAll(".portfolio-item")
portfolioItems.forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px)"
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  item.style.transitionDelay = `${index * 0.1}s`
  observer.observe(item)
})

// ===========================
// Skill Bar Animation
// ===========================
const skillBars = document.querySelectorAll(".skill-progress")
const skillsSection = document.querySelector(".about")

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.style.width
          bar.style.width = "0"
          setTimeout(() => {
            bar.style.width = width
          }, 200)
        })
        skillObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (skillsSection) {
  skillObserver.observe(skillsSection)
}

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Here you would typically send the form data to a server
  // For this demo, we'll just log it and show an alert
  console.log("Form submitted:", { name, email, subject, message })

  alert("Thank you for your message! I will get back to you soon.")

  // Reset form
  contactForm.reset()
})

// ===========================
// Smooth Scroll Enhancement
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===========================
// Initialize
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active link
  updateActiveLink()

  // Add initial fade-in animation to hero content
  const heroElements = document.querySelectorAll(".fade-in")
  heroElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1 + 0.2}s`
  })
})

// ===========================
// Performance Optimization
// ===========================
let scrollTimeout
window.addEventListener(
  "scroll",
  () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout)
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      updateActiveLink()
    })
  },
  { passive: true },
)
