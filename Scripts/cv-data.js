// CV Data & DOM Hydration
// Single source of truth for all CV content

const cv = {
  personal: {
    name: "Hernan",
    phone: "+34 644 03 23 30",
    email: "hernan@gmail.com",
    location: "Sevilla, España",
    linkedin: "https://linkedin.com/in/hernanadaits",
    linkedinHandle: "linkedin.com/in/hernanadaits"
  },
  sections: {
    aboutMe: {
      title: "Sobre mi",
      text: "Soy Hernán, tengo 21 años y me considero bastante entusiasta colaborador y creativo. Disfruto trabajando en equipo y deseo continuar aprendiendo sobre los temas que más despiertan mi curiosidad como la IA, seguridad informática, accesibilidad del software a usuarios con capacidades especiales y programación en general."
    },
    contactTitle: "Contacto",
    linkedinTitle: "LinkedIn",
    education: {
      title: "Formación",
      langsLabel: "Lenguajes de Programacion"
    },
    practicesLabel: "Formacion",
    languagesLabel: "Idiomas",
    othersLabel: "Otros",
    othersText: "Entre mis hobbies destacan la producción profesional de música electrónica usando la DAW FL Studio  21",
    languagesLabel2: "Lenguajes de Programacion"
  },
  highlights: {
    title: "OTROS:",
    subtitle: "Entre mis hobbies destacan la producción profesional de música electrónica usando la DAW FL Studio  21",
    percentage: "Discapacidad 36% - Fisica Movilidad Reducida"
  },
  languages: [
    { name: "C", icon: "devicon-c-original" },
    { name: "JavaScript", icon: "devicon-javascript-plain" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inyectar iconos SVG
  document.getElementById("phone-icon").innerHTML = icons.phone;
  document.getElementById("email-icon").innerHTML = icons.email;
  document.getElementById("location-icon").innerHTML = icons.location;
  
  document.querySelectorAll(".others-contact-icon").forEach((el) => {
    const key = el.dataset.icon;
    if (icons[key]) el.innerHTML = icons[key];
  });

  // 2. Fill left contact section
  const phoneItem = document.getElementById("phone-item");
  phoneItem.innerHTML = icons.phone + cv.personal.phone;
  
  const emailLink = document.getElementById("email-link");
  emailLink.href = `mailto:${cv.personal.email}`;
  emailLink.innerHTML = icons.email + cv.personal.email;
  
  const locationItem = document.getElementById("location-item");
  locationItem.innerHTML = icons.location + cv.personal.location;

  // 3. Fill LinkedIn section (left)
  const linkedinLink = document.querySelector("#linkedin a");
  if (linkedinLink) {
    linkedinLink.href = cv.personal.linkedin;
    linkedinLink.textContent = cv.personal.linkedinHandle;
  }

  // 4. Fill others section contact items
  const others = document.querySelectorAll(".others-contact-item");
  if (others.length >= 4) {
    others[0].innerHTML = icons.phone + cv.personal.phone;
    
    others[1].href = `mailto:${cv.personal.email}`;
    others[1].innerHTML = icons.email + cv.personal.email;
    
    others[2].innerHTML = icons.location + cv.personal.location;
    
    others[3].href = cv.personal.linkedin;
    others[3].innerHTML = '<span class="icon">in</span>' + cv.personal.linkedinHandle;
  }

  // 5. Fill name/title
  document.querySelector(".clickable-name").textContent = cv.personal.name;

  // 6. Fill highlight buttons
  document.querySelector(".btn-text.big .btn-title").textContent = cv.highlights.title;
  document.querySelector(".btn-text.big .btn-subtitle").textContent = cv.highlights.subtitle;
  document.querySelector(".btn-text.small .btn-subtitle-sm").textContent = cv.highlights.percentage;

  // 7. Fill cards in others section
  const cards = document.querySelectorAll(".others-card");
  if (cards.length >= 2) {
    cards[0].querySelector(".btn-title").textContent = cv.highlights.title;
    cards[0].querySelector(".btn-subtitle").textContent = cv.highlights.subtitle;
    cards[1].querySelector(".btn-subtitle-sm").textContent = cv.highlights.percentage;
  }

  // 8. Fill programming languages
  const langSections = [
    document.querySelector(".edu-langs-icons"),
    document.querySelector(".funny-fact .lang-icons")
  ];
  langSections.forEach(section => {
    if (section) {
      section.innerHTML = cv.languages
        .map(lang => `<i class="lang-icon ${lang.icon}"></i>`)
        .join("");
    }
  });

  // 9. Fill section titles & text content
  document.querySelector("#about-me h2").textContent = cv.sections.aboutMe.title;
  document.querySelector("#about-me p").textContent = cv.sections.aboutMe.text;
  
  document.querySelector("#contact h2").textContent = cv.sections.contactTitle;
  document.querySelector("#linkedin h2").textContent = cv.sections.linkedinTitle;
  
  document.querySelector("#education h2").textContent = cv.sections.education.title;
  document.querySelector(".edu-langs-label").textContent = cv.sections.education.langsLabel;
  
  document.querySelector(".section-sep:nth-of-type(1) .section-sep-bar").textContent = cv.sections.practicesLabel;
  document.querySelector(".section-sep:nth-of-type(2) .section-sep-bar").textContent = cv.sections.languagesLabel;
  document.querySelector(".section-sep:nth-of-type(3) .section-sep-bar").textContent = cv.sections.othersLabel;
  
  document.querySelector("#languages h2").textContent = cv.sections.languagesLabel;
  document.querySelector("#others h2").textContent = cv.sections.othersLabel;
  document.querySelector("#others > p").textContent = cv.sections.othersText;
  document.querySelector(".funny-fact > p").textContent = cv.sections.languagesLabel2;
});
