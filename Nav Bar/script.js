document.addEventListener("DOMContentLoaded", () => {
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
        }, 37); // increase the interval to slow down the animation
      };
    });
  });
  
  