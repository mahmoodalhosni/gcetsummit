
// Background permenant looping interactive animation
particlesJS('particles-js', {
    particles: {
      number: {
        value: 130,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.8,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: true,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: false,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });



function createParticles() {
    var particles = [];
    var isParticlesActive = false;
    var particlesCanvas = document.getElementById("fireworks-canvas");
    var particlesContext = particlesCanvas.getContext("2d");
    var background = document.querySelector(".background");
    var countdownDiv = document.getElementById("countdown");
    var launchButton = document.getElementById("myButton");
  
    function resizeCanvas() {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
    }
  
    function Particle() {
      this.x = particlesCanvas.width / 2;
      this.y = particlesCanvas.height / 2;
      var angle = Math.random() * Math.PI * 2; // Random angle in radians
      var speed = Math.random() * 5 + 2; // Adjust the speed range as desired
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.color = getRandomColor();
      this.radius = Math.random() * 10 + 5; // Adjust the size range as desired
      this.decay = Math.random() * 0.002 + 0.001; // Adjust the decay range as desired
    }
  
    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
  
      if (this.alpha <= 0) {
        particles.splice(particles.indexOf(this), 1);
      }
    };
  
    Particle.prototype.draw = function () {
      particlesContext.beginPath();
      particlesContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      particlesContext.fillStyle = this.color;
      particlesContext.globalAlpha = this.alpha;
      particlesContext.fill();
    };
  
    function getRandomColor() {
      var colors = [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    function loop() {
      requestAnimationFrame(loop);
      if (isParticlesActive) {
        particlesContext.clearRect(
          0,
          0,
          particlesCanvas.width,
          particlesCanvas.height
        );
  
        for (var i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }
    }
  
    function changeBackgroundGradient() {
      // Set the radial gradient style for the background
      background.style.background = "radial-gradient(circle at center, #00FFFF, #0000FF)";
    }
  
    function resetBackgroundGradient() {
      // Reset the background to its original style
      background.style.background = "";
    }
  
    function startFireworks() {
        isParticlesActive = true;
        resizeCanvas();
    
        changeBackgroundGradient();
    
        for (var i = 0; i < 500; i++) {
          particles.push(new Particle());
        }
        loop();
    
        setTimeout(function () {
          isParticlesActive = false;
          resetBackgroundGradient();
        }, 8000); // Adjust the duration (in milliseconds) as desired
      }
    
      function countdown(count) {
        if (count > 0) {
          countdownDiv.textContent = count;
          setTimeout(function () {
            countdown(count - 1);
          }, 1000); // 1000 milliseconds (1 second) delay between each count
        } else {
          countdownDiv.textContent = "";
          launchButton.textContent = "Programme Launched!";
          launchButton.style.color = "blue";
          launchButton.style.boxShadow = "0 0 15px 5px rgba(255, 255, 255, 0.5)";
        
          startFireworks();
        }
      }
    
      function initiateFireworks() {
        // Check if the button text is already "Programme Launched!"
        if (launchButton.textContent === "Programme Launched!") {
          return; // Exit the function if already launched
        }
    
        // Start the countdown from 5
        // countdownDiv.style.display = "block"; // Show the countdown div
        countdown(5);
      }
    
      window.addEventListener("resize", resizeCanvas);
    
      launchButton.addEventListener("click", initiateFireworks);
    }
    
    // Call the createParticles() function when the document is ready or at an appropriate time
    document.addEventListener("DOMContentLoaded", function () {
      createParticles();
    });