document.addEventListener("DOMContentLoaded", () => {
  // Get language elements
  const languageToggle = document.getElementById("language-toggle")
  const languageDropdown = document.getElementById("language-dropdown")
  const mobileLanguageToggle = document.getElementById("mobile-language-toggle")
  const mobileLanguageDropdown = document.getElementById("mobile-language-dropdown")
  const currentLanguageEl = document.getElementById("current-language")
  const mobileCurrentLanguageEl = document.getElementById("mobile-current-language")
  const languageOptions = document.querySelectorAll(".language-option")

  // Get saved language preference or default to English
  let currentLanguage = localStorage.getItem("language") || "english"

  // Set initial language
  document.documentElement.setAttribute("data-language", currentLanguage)
  currentLanguageEl.textContent = currentLanguage === "english" ? "English" : "मराठी"
  mobileCurrentLanguageEl.textContent = currentLanguage === "english" ? "EN" : "मराठी"

  // Translations object
  const translations = {
    english: {
      greeting: "Hello",
      goodbye: "Goodbye",
    },
    marathi: {
      greeting: "नमस्कार",
      goodbye: "अलविदा",
    },
  }

  // Apply translations on page load
  applyTranslations()

  // Toggle language dropdown
  if (languageToggle) {
    languageToggle.addEventListener("click", (e) => {
      e.preventDefault()
      languageDropdown.classList.toggle("hidden")
    })
  }

  if (mobileLanguageToggle) {
    mobileLanguageToggle.addEventListener("click", (e) => {
      e.preventDefault()
      mobileLanguageDropdown.classList.toggle("hidden")
    })
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!languageToggle?.contains(e.target) && !languageDropdown?.contains(e.target)) {
      languageDropdown?.classList.add("hidden")
    }

    if (!mobileLanguageToggle?.contains(e.target) && !mobileLanguageDropdown?.contains(e.target)) {
      mobileLanguageDropdown?.classList.add("hidden")
    }
  })

  // Handle language selection
  languageOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault()
      const selectedLanguage = this.getAttribute("data-lang")

      if (selectedLanguage !== currentLanguage) {
        currentLanguage = selectedLanguage

        // Save preference
        localStorage.setItem("language", currentLanguage)

        // Update UI
        document.documentElement.setAttribute("data-language", currentLanguage)
        currentLanguageEl.textContent = currentLanguage === "english" ? "English" : "मराठी"
        mobileCurrentLanguageEl.textContent = currentLanguage === "english" ? "EN" : "मराठी"

        // Apply translations
        applyTranslations()
      }

      // Hide dropdowns
      languageDropdown.classList.add("hidden")
      mobileLanguageDropdown.classList.add("hidden")
    })
  })

  // Function to apply translations
  function applyTranslations() {
    const elements = document.querySelectorAll("[data-key]")

    elements.forEach((element) => {
      const key = element.getAttribute("data-key")
      if (translations[currentLanguage] && translations[currentLanguage][key]) {
        element.textContent = translations[currentLanguage][key]
      }
    })
  }
})
