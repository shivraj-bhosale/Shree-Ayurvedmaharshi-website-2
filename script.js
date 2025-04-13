document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation library
  let AOS // Declare AOS variable
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  } else {
    console.warn("AOS is not defined. Make sure it is properly imported.")
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.remove("transparent-nav")
        navbar.classList.add("scrolled")
        navbar.classList.add("bg-white")
        navbar.classList.add("shadow-md")

        // Change menu toggle color
        const menuToggle = document.getElementById("menu-toggle")
        if (menuToggle) {
          menuToggle.classList.remove("text-white")
          menuToggle.classList.add("text-gray-800")
        }
      } else {
        navbar.classList.add("transparent-nav")
        navbar.classList.remove("scrolled")
        navbar.classList.remove("bg-white")
        navbar.classList.remove("shadow-md")

        // Only change colors back if we're on the homepage
        if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
          // Change menu toggle color back
          const menuToggle = document.getElementById("menu-toggle")
          if (menuToggle) {
            menuToggle.classList.add("text-white")
            menuToggle.classList.remove("text-gray-800")
          }
        }
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Set initial state
    handleScroll()
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Add a small delay to ensure proper scrolling
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust offset for navbar height
            behavior: "smooth",
          })
        }, 100)

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
        }
      }
    })
  })

  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question")

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const answer = this.nextElementSibling
        const icon = this.querySelector("i")

        // Toggle active class
        this.classList.toggle("active")

        // Toggle answer visibility
        if (answer.classList.contains("hidden")) {
          answer.classList.remove("hidden")
          if (icon) icon.style.transform = "rotate(180deg)"
        } else {
          answer.classList.add("hidden")
          if (icon) icon.style.transform = "rotate(0deg)"
        }
      })
    })
  }

  // Testimonial star rating
  const starRatings = document.querySelectorAll(".far.fa-star")

  if (starRatings.length > 0) {
    starRatings.forEach((star, index) => {
      star.addEventListener("click", function () {
        // Get all stars in this rating group
        const starsGroup = this.parentElement.querySelectorAll(".far.fa-star")

        // Reset all stars
        starsGroup.forEach((s) => {
          s.classList.remove("fas")
          s.classList.add("far")
        })

        // Fill stars up to the clicked one
        for (let i = 0; i <= index; i++) {
          starsGroup[i].classList.remove("far")
          starsGroup[i].classList.add("fas")
          starsGroup[i].classList.add("text-yellow-500")
        }
      })

      star.addEventListener("mouseover", function () {
        // Get all stars in this rating group
        const starsGroup = this.parentElement.querySelectorAll(".far.fa-star, .fas.fa-star")
        const currentIndex = Array.from(starsGroup).indexOf(this)

        // Temporarily highlight stars on hover
        for (let i = 0; i <= currentIndex; i++) {
          starsGroup[i].classList.add("text-yellow-500")
        }
      })

      star.addEventListener("mouseout", function () {
        // Get all stars in this rating group
        const starsGroup = this.parentElement.querySelectorAll(".far.fa-star")

        // Remove temporary highlight
        starsGroup.forEach((s) => {
          if (s.classList.contains("far")) {
            s.classList.remove("text-yellow-500")
          }
        })
      })
    })
  }

  // File upload preview
  const fileInput = document.getElementById("photo")

  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      const fileName = e.target.files[0]?.name
      if (fileName) {
        const fileLabel = this.nextElementSibling
        if (fileLabel) {
          fileLabel.innerHTML = `<i class="fas fa-check-circle text-3xl text-green-500 mb-2"></i><p class="text-gray-700">File selected: ${fileName}</p>`
        }
      }
    })
  }

  // Video testimonial play buttons
  const playButtons = document.querySelectorAll(".w-16.h-16.bg-green-600")

  if (playButtons.length > 0) {
    playButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // In a real implementation, this would play the video
        // For now, just change the icon
        const icon = this.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-play")
          icon.classList.add("fa-pause")
        }

        // Toggle play/pause on click
        button.addEventListener("click", () => {
          if (icon.classList.contains("fa-play")) {
            icon.classList.remove("fa-play")
            icon.classList.add("fa-pause")
          } else {
            icon.classList.remove("fa-pause")
            icon.classList.add("fa-play")
          }
        })
      })
    })
  }

  // Form validation
  const forms = document.querySelectorAll("form")

  if (forms.length > 0) {
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        // Basic validation
        let isValid = true
        const requiredFields = form.querySelectorAll("input[required], textarea[required], select[required]")

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false
            field.classList.add("border-red-500")

            // Add error message if it doesn't exist
            let errorMsg = field.nextElementSibling
            if (!errorMsg || !errorMsg.classList.contains("error-message")) {
              errorMsg = document.createElement("p")
              errorMsg.classList.add("error-message", "text-red-500", "text-sm", "mt-1")
              errorMsg.textContent = "This field is required"
              field.parentNode.insertBefore(errorMsg, field.nextSibling)
            }
          } else {
            field.classList.remove("border-red-500")

            // Remove error message if it exists
            const errorMsg = field.nextElementSibling
            if (errorMsg && errorMsg.classList.contains("error-message")) {
              errorMsg.remove()
            }
          }
        })

        // If form is valid, you would typically submit it
        if (isValid) {
          // Show success message
          const successMsg = document.createElement("div")
          successMsg.classList.add(
            "bg-green-100",
            "border",
            "border-green-400",
            "text-green-700",
            "px-4",
            "py-3",
            "rounded",
            "mt-4",
          )
          successMsg.innerHTML = "<strong>Success!</strong> Your message has been sent. We will get back to you soon."

          form.appendChild(successMsg)

          // Reset form
          form.reset()

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMsg.remove()
          }, 5000)
        }
      })
    })
  }

  // Simple Swiper initialization without complex calculations
  let swiperInstance // Declare swiperInstance outside the if block

  if (document.querySelector(".hero-swiper")) {
    const swiper = new Swiper(".hero-swiper", {
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 1500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        init: function () {
          this.update()
        },
        imagesReady: function () {
          this.update()
          // Force update after images are loaded to ensure proper sizing
          setTimeout(() => {
            this.update()
          }, 100)
        },
        resize: function () {
          this.update()
        },
      },
      // Ensure no white space between slides
      spaceBetween: 0,
      // Maintain aspect ratio
      updateOnImagesReady: true,
      observer: true,
      observeParents: true,
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (swiperInstance) {
        swiperInstance.update()
      }
    })
  }
})
