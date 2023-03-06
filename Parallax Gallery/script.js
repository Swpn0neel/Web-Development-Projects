document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}


window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const originalTexts = [];
  
    // Store the original texts of all h1 elements
    const h1Elements = document.querySelectorAll("h1");
    h1Elements.forEach(h1 => {
      originalTexts.push(h1.innerText);
    });
  
    // Attach the mouseover event handler to each h1 element
    h1Elements.forEach((h1, index) => {
      let interval = null;
  
      h1.onmouseover = event => {
        let iteration = 0;
  
        clearInterval(interval);
  
        interval = setInterval(() => {
          event.target.innerText = originalTexts[index]
            .split("")
            .map((letter, i) => {
              if(i < iteration) {
                return originalTexts[index][i];
              }
  
              return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
  
          if(iteration >= originalTexts[index].length){ 
            clearInterval(interval);
            event.target.innerText = originalTexts[index]; // restore original text
          }
  
          iteration += 1 / 3;
        }, 35); // increase the interval to slow down the animation
      };
    });
});