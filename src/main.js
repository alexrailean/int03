import "./styles/reset.css";
import "./styles/style.css";
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const progressBarLinks = document.querySelectorAll(".progress-bar-desktop a");
const chapters = document.querySelectorAll(
  "#intro, #chapter_onest, #chapter_two, #chapter_three, #chapter_four, #chapter_five, #chapter_six"
);

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

const initProgressBar = () => {
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

const initCarousel = () => {
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

const initFallback = () => {
  if (typeof window === "undefined" || !window.document) {
    document.querySelector(".header-menu-row").style.display = "none";
    progressBarLinks.forEach((link, index) => {
      link.setAttribute("href", `#chapter_${index + 1}`);
    });
  }
};

const initDragReveal = () => {
  const container = document.querySelector(".image-container");
  const afterImage = document.querySelector(".after");
  const dragLine = document.querySelector(".drag-line");
  const dragHandle = document.querySelector(".drag-handle");
  const bodyText = document.getElementById("body-text");
  const contentContainer = document.querySelector(".content");

  if (!container || !afterImage || !dragLine || !dragHandle || !bodyText) return;

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

  dragHandle.addEventListener("touchstart", handleDragStart, { passive: false });
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

const initQuoteInteraction = () => {
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

  let hoverTimer = null;

  const handleMouseEnter = (e) => {
    e.target.innerHTML = firstMessage;
    hoverTimer = setTimeout(() => {
      e.target.innerHTML = secondMessage;
    }, 1500);
  };

  const handleMouseLeave = (e) => {
    e.target.innerHTML = typingDotsHTML;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  };

  desktopQuote.addEventListener("mouseenter", handleMouseEnter);
  desktopQuote.addEventListener("mouseleave", handleMouseLeave);

  mobileQuote.addEventListener("mouseenter", handleMouseEnter);
  mobileQuote.addEventListener("mouseleave", handleMouseLeave);
};

const initHotspotTooltips = () => {
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

const init = () => {
  const contentContainer = document.querySelector(".content");
  if (contentContainer) {
    contentContainer.classList.remove("active");
  }

  initProgressBar();
  toggleOverlayMenu();
  initFallback();
  initDragReveal();
  initQuoteInteraction();
  initHotspotTooltips();
  initCarousel();
};

document.addEventListener("DOMContentLoaded", init);


