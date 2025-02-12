document.addEventListener("DOMContentLoaded", () => {
    const characterLeft = document.querySelector(".character-left");
    const characterRight = document.querySelector(".character-right");
    const warmthOverlay = document.querySelector(".warmth-overlay");
    const meterFill = document.querySelector(".meter-fill");
    const message = document.querySelector(".message");
    const hugMessage = document.querySelector(".hug-message");
    const heartbeatSound = document.getElementById("heartbeatSound");
    const body = document.body;
  
    let lastScrollTop = 0;
    let distance = 0;
    let isHugging = false;
  
    // Messages to show based on distance
    const messages = [
      { distance: 80, text: "Just a little closer..." },
      { distance: 60, text: "I can feel your warmth..." },
      { distance: 40, text: "Almost there..." },
      { distance: 20, text: "So close to you..." },
      { distance: 0, text: "I love hugging you! ❤️" },
    ];
  
    // Create floating feelings
    const feelings = document.querySelector(".feelings-container");
    const feelingWords = document.querySelectorAll(".feeling");
  
    function updateFeelings() {
      if (distance == 100) {
        revealFinalSurprise();
      }
      feelingWords.forEach((feeling, index) => {
        setTimeout(() => {
          feeling.style.left = `${Math.random() * 80 + 10}%`;
          feeling.style.top = `${Math.random() * 80 + 10}%`;
          feeling.style.opacity = "0.6";
          feeling.style.transform = "scale(1)";
  
          setTimeout(() => {
            feeling.style.opacity = "0";
            feeling.style.transform = "scale(0)";
          }, 2000);
        }, index * 500);
      });
    }
  
    // Handle scroll events
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDiff = scrollTop - lastScrollTop;
  
      // Update distance based on scroll
      if (scrollDiff > 0 && distance > 0) {
        distance = Math.max(0, distance - 2);
      } else if (scrollDiff < 0 && distance < 100) {
        distance = Math.min(100, distance + 2);
      }
  
      updateScene();
      lastScrollTop = scrollTop;
    }
  
    function updateScene() {
      // Update character positions
      const leftPos = 20 + distance * 0.3;
      const rightPos = 20 + distance * 0.3;
  
      characterLeft.style.left = `${leftPos}%`;
      characterRight.style.right = `${rightPos}%`;
  
      // Update meter
      meterFill.style.width = `${distance}%`;
  
      // Update background warmth
      const warmth = 1 - distance / 100;
      warmthOverlay.style.opacity = warmth;
  
      // Change background color
      const hue = 200 + warmth * 20;
      body.style.background = `hsl(${hue}, 100%, 95%)`;
  
      // Show appropriate message
      const currentMessage = messages.find((m) => distance <= m.distance);
      if (currentMessage) {
        hugMessage.textContent = currentMessage.text;
        message.classList.add("visible");
      }
  
      // Trigger hug animation
      console.log(distance);
      if (distance === 100 && !isHugging) {
        triggerHug();
      }
    }
  
    function triggerHug() {
      isHugging = true;
  
      // Play heartbeat sound
      // if (heartbeatSound.readyState >= 2) {
      //   // Check if loaded
      //   heartbeatSound.play();
      // }
  
      // Trigger feeling words animation
      updateFeelings();
  
      // Animate hearts
      const hearts = document.querySelectorAll(".heart");
      hearts.forEach((heart) => {
        gsap.to(heart, {
          scale: 1.5,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
        });
      });
  
      // Animate beats
      const beats = document.querySelectorAll(".beat");
      beats.forEach((beat) => {
        gsap.to(beat, {
          scaleY: 1.5,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
        });
      });
  
      // Reset hug state after animation
      setTimeout(() => {
        isHugging = false;
      }, 3000);
    }
  
    // Touch handling for mobile
    let touchStartY = 0;
  
    function handleTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
  
    function handleTouchMove(e) {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
  
      // Update distance based on touch movement
      if (diff > 0 && distance > 0) {
        distance = Math.max(0, distance - 1);
      } else if (diff < 0 && distance < 100) {
        distance = Math.min(100, distance + 1);
      }
  
      updateScene();
      touchStartY = touchY;
    }
  
    function revealFinalSurprise() {
      document.body.innerHTML = "";
      // document.body.style.background = "#4a1010";
  
      const finalMessage = document.createElement("div");
      finalMessage.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          color: white;
          text-align: center;
          `;
      finalMessage.innerHTML =
        '<image src="hug-day.gif" style="height:250px"></image><br> <span style="color:red;"> Hemanth ❤️ kidd <br>it feels warmer now<br></span><audio id="heartbeatSound" preload="auto"><source src="Heartbeat Normal - QuickSounds.com.mp3" type="audio/mpeg" style="display: none;" loop></audio>';
  
      document.body.appendChild(finalMessage);
      document.getElementById("heartbeatSound").play();
      createChocolateRain();
    }
  
    // Chocolate rain effect
    function createChocolateRain() {
      setInterval(() => {
        const drop = document.createElement("div");
        drop.textContent = "💞";
        drop.style.cssText = `
            position: fixed;
            top: -40px;
            left: ${Math.random() * 100}%;
            font-size: 24px;
            animation: fall ${Math.random() * 3 + 2}s linear;
        `;
        document.body.appendChild(drop);
  
        // Remove heart after animation ends
        setTimeout(() => drop.remove(), 5000);
      }, 100);
    }
  
    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
  
    // Initialize scene
    updateScene();
  });
