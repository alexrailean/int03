import "./styles/reset.css";
import "./styles/style.css";
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const progressBarLinks = document.querySelectorAll(".progress-bar-desktop a");
const chapters = document.querySelectorAll(
  "#intro, #chapter_onest, #chapter_two, #chapter_three, #chapter_four, #chapter_five, #chapter_six"
);

const wrapLetters = (text) => {
  return text
    .split("")
    .map((char) => {
      if (char === " ") return `<span class="letter">&nbsp;</span>`;
      return `<span class="letter">${char}</span>`;
    })
    .join("");
};

const heroAnimations = () => {
  const heroTimeline = gsap.timeline();
  heroTimeline.from(".hero_image__plantin", {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  heroTimeline.from(
    ".hero_image__moretus",
    {
      x: 200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.8"
  );

  heroTimeline.from(
    ".scroll_down img",
    {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.5"
  );

  heroTimeline.from(
    ".scroll_down__text",
    {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.5"
  );

  heroTimeline.from(
    ".hero_image__img",
    {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    },
    "-=1"
  );
};

const highlightActiveDot = () => {
  chapters.forEach((chapter, index) => {
    const rect = chapter.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 4 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      progressBarLinks.forEach((link) => link.classList.remove("active"));
      progressBarLinks[index].classList.add("active");
    }
  });
};

const toggleOverlayMenu = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const overlay = document.querySelector(".overlay-menu");
  const overlayProgressBarLinks = document.querySelectorAll(
    ".overlay-progress-bar a"
  );

  menuToggle.addEventListener("click", () => {
    const isOverlayOpen = overlay.style.display === "flex";
    overlay.style.display = isOverlayOpen ? "none" : "flex";
    menuToggle.textContent = isOverlayOpen ? "MENU" : "CLOSE";
  });

  overlayProgressBarLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      chapters[index].scrollIntoView({ behavior: "smooth" });
      overlay.style.display = "none";
      menuToggle.textContent = "MENU";
    });
  });
};

const progressBar = () => {
  if (progressBarLinks.length > 0 && chapters.length > 0) {
    progressBarLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        chapters[index].scrollIntoView({ behavior: "smooth" });
      });
    });

    window.addEventListener("scroll", highlightActiveDot);
  }
};

const carousel = () => {
  const carousel = document.querySelector(".chapter_threeone__content");
  const images = carousel.querySelectorAll("img");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const titleElement = document.getElementById("dynamic-title");
  const textElement = document.getElementById("dynamic-text");

  const slidesContent = [
    {
      title: "Printing Monopoly",
      texts: [
        "In modern terms, he’s diversifying his income streams. But it all hinges on one big question: Can he keep this empire afloat when the world around him is about to explode?",
        "But here’s the real power move: Plantin doesn’t stop at Antwerp. He expands. Multiple facilities across Europe, each focused on different genres—religious works, scientific treatises, you name it.",
      ],
    },
    {
      title: "Leiden Facility",
      texts: [
        "Over in the Netherlands, Plantin hooks up with the scholarly crowd at the newly founded university.",
        "Academic works? Check. Protestant materials? Double-check. It’s like a cerebral playground for Plantin’s expanding repertoire.",
      ],
    },
    {
      title: "Leuven Facility",
      texts: [
        "A quieter outpost compared to Antwerp, but still part of the grand plan. ",
        "Think of Leuven as the warm-up gig where Plantin tested the waters before his Antwerp-based main act stole the show.",
      ],
    },
    {
      title: "Antwerp Facility",
      texts: [
        "This is ground zero for Plantin’s print empire. Think of it as the bustling HQ where religious tomes, scientific treatises, and everything in between rolled off the presses. ",
        "If his operation’s a heart, Antwerp’s the beat that keeps the whole thing alive.",
      ],
    },
    {
      title: "Paris Facility",
      texts: [
        "Then there’s Paris, the cultural hotspot. Printing in the City of Light means tapping into the French-speaking market.",
        "There, he mixes cutting-edge ideas with timeless classics, all under the gaze of Europe’s literary elite. With his family by his side,he marched toward a printing empire.",
      ],
    },
    {
      title: "Frankfurt Facility",
      texts: [
        "Frankfurt is all about trade. Home to the legendary Frankfurt Book Fair. Plantin’s presence here is all about distribution",
        "getting those shiny new publications straight into the hands of traders, scholars, and book-hungry travelers from across the continent.",
      ],
    },
  ];

  let currentIndex = 0;

  const updateSlide = () => {
    images.forEach((img, index) => {
      img.style.display = index === currentIndex ? "block" : "none";
    });
    titleElement.textContent = slidesContent[currentIndex].title;
    textElement.innerHTML = slidesContent[currentIndex].texts
      .map((text) => `<p class='bodytext_style'>${text}</p>`)
      .join("");
  };

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
  });

  updateSlide();
};

const fallback = () => {
  if (typeof window === "undefined" || !window.document) {
    document.querySelector(".header-menu-row").style.display = "none";
    progressBarLinks.forEach((link, index) => {
      link.setAttribute("href", `#chapter_${index + 1}`);
    });
  }
};

const dragReveal = () => {
  const container = document.querySelector(".image-container");
  const afterImage = document.querySelector(".after");
  const dragLine = document.querySelector(".drag-line");
  const dragHandle = document.querySelector(".drag-handle");
  const bodyText = document.getElementById("body-text");
  const contentContainer = document.querySelector(".content");

  if (!container || !afterImage || !dragLine || !dragHandle || !bodyText)
    return;

  dragLine.style.left = "5%";
  afterImage.style.clipPath = "inset(0 95% 0 0)";

  let isDragging = false;

  const texts = {
    before: `Our story begins in Saint-Avertin, a sleepy hamlet in France, circa 1520. While other kids dream of heroic battles, young Christophe Plantin is captivated by dusty old books. Why books? Because to him, they hold secrets—secrets he’s determined to unlock.`,
    after: `But here’s the twist: just as Plantin’s learning to bind and print under Robert II Macé, life hits him with heartbreak. He and his wife, Jeanne Rivière, lose their only son. Now, you might be thinking: ‘This is where most people give up.’ Instead, Plantin’s grief supercharges his ambition. Which brings us to the next question: Where does a determined dreamer go to turn heartbreak into history?`,
  };

  const updateContent = (percentage) => {
    bodyText.textContent = percentage > 50 ? texts.after : texts.before;
    contentContainer.classList[percentage > 50 ? "add" : "remove"]("active");
  };

  const handleDragStart = (e) => {
    isDragging = true;
    e.preventDefault();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const containerRect = container.getBoundingClientRect();
    const dragX = e.touches
      ? e.touches[0].clientX - containerRect.left
      : e.clientX - containerRect.left;
    const percentage =
      (Math.max(0, Math.min(dragX, containerRect.width)) /
        containerRect.width) *
      100;

    dragLine.style.left = `${percentage}%`;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    updateContent(percentage);
  };

  const handleDragEnd = () => {
    isDragging = false;
  };

  dragHandle.addEventListener("mousedown", handleDragStart);
  window.addEventListener("mousemove", handleDragMove);
  window.addEventListener("mouseup", handleDragEnd);

  dragHandle.addEventListener("touchstart", handleDragStart, {
    passive: false,
  });
  window.addEventListener("touchmove", handleDragMove, { passive: false });
  window.addEventListener("touchend", handleDragEnd);

  return () => {
    dragHandle.removeEventListener("mousedown", handleDragStart);
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
    dragHandle.removeEventListener("touchstart", handleDragStart);
    window.removeEventListener("touchmove", handleDragMove);
    window.removeEventListener("touchend", handleDragEnd);
  };
};

const quoteInteraction = () => {
  const desktopQuote = document.querySelector(".intro_quote_self.desktop-only");
  const mobileQuote = document.querySelector(".visuals-text.vis_hiddenphone");

  if (!desktopQuote || !mobileQuote) return;

  const typingDotsHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  const firstMessage = "I’m gonna flip this entire system on its head";
  const secondMessage = "Think you can guess how I did it? Stick around";

  desktopQuote.innerHTML = typingDotsHTML;
  mobileQuote.innerHTML = typingDotsHTML;

  let typingTimeline = null;

  const typeText = (element, message, onComplete) => {
    if (typingTimeline) {
      typingTimeline.kill();
      typingTimeline = null;
    }

    element.innerHTML = wrapLetters(message) + `<span class="cursor">|</span>`;

    const letters = element.querySelectorAll(".letter");
    const cursor = element.querySelector(".cursor");

    gsap.set(letters, { opacity: 0 });

    typingTimeline = gsap.timeline({
      onComplete: onComplete,
    });

    typingTimeline.to(letters, {
      opacity: 1,
      duration: 0.05, 
      stagger: 0.05, 
      ease: "none",
    });

    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  };

  const resetTyping = (element) => {
    if (typingTimeline) {
      typingTimeline.kill();
      typingTimeline = null;
    }
    element.innerHTML = typingDotsHTML;
  };


  const handleMouseEnter = (e) => {
    const target = e.currentTarget;

    typeText(target, firstMessage, () => {
      typeText(target, secondMessage);
    });
  };

  const handleMouseLeave = (e) => {
    const target = e.currentTarget;
    resetTyping(target);
  };

  const handleClick = (e) => {
    const target = e.currentTarget;
    if (typingTimeline) return;

    typeText(target, firstMessage, () => {
      typeText(target, secondMessage);
    });
  };

  desktopQuote.addEventListener("mouseenter", handleMouseEnter);
  desktopQuote.addEventListener("mouseleave", handleMouseLeave);
  mobileQuote.addEventListener("click", handleClick);
};

const hotspotTooltips = () => {
  const hotspots = document.querySelectorAll(".hotspot");
  if (!hotspots.length) return;
  document.addEventListener("click", (e) => {
    let clickedHotspot = null;
    hotspots.forEach((hotspot) => {
      if (hotspot.contains(e.target)) {
        clickedHotspot = hotspot;
      } else {
        hotspot.classList.remove("active");
      }
    });
    if (clickedHotspot) {
      clickedHotspot.classList.toggle("active");
    }
  });
};

const eyeFollow = () => {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    gsap.set("#left-eye, #right-eye", { x: 0, y: 0 });
    return;
  }

  const leftEye = document.getElementById("left-eye");
  const rightEye = document.getElementById("right-eye");

  let maxMove = window.innerWidth < 768 ? 3 : 6;

  window.addEventListener("resize", () => {
    maxMove = window.innerWidth < 768 ? 3 : 6;
  });

  const moveEyes = (event) => {
    const { clientX, clientY } = event;

    [leftEye, rightEye].forEach((eye) => {
      const rect = eye.getBoundingClientRect();

      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
      const deltaX = Math.cos(angle) * maxMove;
      const deltaY = Math.sin(angle) * maxMove;

      gsap.to(eye, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  window.addEventListener("mousemove", moveEyes);
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("mousemove", moveEyes);
  });
};

if (typeof gsap !== "undefined") {
  document.addEventListener("DOMContentLoaded", eyeFollow);
} else {
  console.error(
    "GSAP is not loaded. Please ensure GSAP scripts are included before main.js."
  );
}

const init = () => {
  const contentContainer = document.querySelector(".content");
  if (contentContainer) {
    contentContainer.classList.remove("active");
  }

  progressBar();
  toggleOverlayMenu();
  fallback();
  dragReveal();
  quoteInteraction();
  hotspotTooltips();
  carousel();
  heroAnimations();
  eyeFollow();
};

init();
