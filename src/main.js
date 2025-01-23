import "./styles/reset.css";
import "./styles/style.css";

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
    before: `Our story begins in Saint-Avertin, a sleepy hamlet in France, circa 1520. While other kids dream of heroic battles, young Christophe Plantin is captivated by dusty old books. Why books? Because to him, they hold secrets—secrets he's determined to unlock.`,
    after: `But here's the twist: just as Plantin's learning to bind and print under Robert II Macé, life hits him with heartbreak. He and his wife, Jeanne Rivière, lose their only son. Now, you might be thinking: 'This is where most people give up!' Instead, Plantin's grief supercharges his ambition. Which brings us to the next question: Where does a determined dreamer go to turn heartbreak into history?`,
  };

  const updateContent = (percentage) => {
    bodyText.textContent = percentage > 50 ? texts.after : texts.before;

    if (percentage > 50) {
      contentContainer.classList.add("active");
    } else {
      contentContainer.classList.remove("active");
    }
  };

  const handleDragStart = (e) => {
    isDragging = true;
    e.preventDefault();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    let dragX = e.touches
      ? e.touches[0].clientX - containerRect.left
      : e.clientX - containerRect.left;

    dragX = Math.max(0, Math.min(dragX, containerRect.width));
    const percentage = (dragX / containerRect.width) * 100;

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
  initDragReveal();
};

document.addEventListener("DOMContentLoaded", init);
