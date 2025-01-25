import "./styles/reset.css";
import "./styles/style.css";

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

const init = () => {
  const contentContainer = document.querySelector(".content");
  contentContainer.classList.remove("active");
  initProgressBar();
  toggleOverlayMenu();
  initFallback();
  initDragReveal();
};

document.addEventListener("DOMContentLoaded", init);
