window.onload = async function () {
  // 1
  const response = await fetch('data/iris.json');
  const irisData = await response.json();

  // 2
  const possibleColor = ["#5d3fd3", "#a73fd3", "#d33fb5", "#d35d3f", "#d3a73f"];

  const irisesWithColors = irisData.map(iris => ({
    ...iris,
    color: possibleColor[Math.floor(Math.random() * possibleColor.length)]
  }));

  // 3
  const filteredIrises = irisesWithColors.filter(iris => iris.sepalWidth < 4);

  // 4
  const totalPetalLength = irisesWithColors.reduce((sum, iris) => sum + iris.petalLength, 0);
  const avgPetalLength = totalPetalLength / irisesWithColors.length;

  // 5
  const foundIris = irisesWithColors.find(iris => iris.petalWidth > 1.0);

  // 6
  const hasPetalLongerThan10 = irisesWithColors.some(iris => iris.petalLength > 10);

  // 7
  const hasPetalLength42 = irisesWithColors.some(iris => iris.petalLength === 4.2);

  // 8
  const allPetalWidthUnder3 = irisesWithColors.every(iris => iris.petalWidth < 3);

  //9
  const allSepalWidthAbove1_2 = irisesWithColors.every(iris => iris.sepalWidth > 1.2);

  // 10
  const irisesWithColorsSorted = irisesWithColors.toSorted((a, b) => a.petalWidth - b.petalWidth);

  class Iris {
    constructor(data) {
      Object.assign(this, data);
      this.x = Math.random() * 300;
      this.y = Math.random() * 50;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
    }

    render(container) {
      const div = document.createElement('div');
      const baseSize = Math.max(this.petalLength * 15, 30);
      const height = Math.max(this.petalWidth * 15, 30);

      this.width = baseSize;
      this.height = height;

      div.style.width = `${baseSize}px`;
      div.style.height = `${height}px`;
      div.style.backgroundColor = this.color;
      div.style.borderRadius = '50%';
      div.style.position = 'absolute';
      div.style.cursor = 'pointer';
      div.style.transition = 'transform 0.2s, background-color 0.3s';
      div.style.zIndex = '1';

      this.div = div;
      container.appendChild(div);

      div.addEventListener('mouseenter', (e) => {
        if (this.species === 'setosa') {
          div.style.transform = 'scale(3)';
        } else if (this.species === 'virginica') {
          div.style.backgroundColor = 'black'; 
        }
      });

      div.addEventListener('mousemove', (e) => {
        if (this.species === 'versicolor') {
          const bounds = container.getBoundingClientRect();
          const mouseX = e.clientX - bounds.left;
          const mouseY = e.clientY - bounds.top;

          const centerX = this.x + this.width / 2;
          const centerY = this.y + this.height / 2;
          const dx = centerX - mouseX;
          const dy = centerY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 300) {
            this.x += dx * 0.9;
            this.y += dy * 0.9;
          }
        }
      });

      div.addEventListener('mouseleave', () => {
        if (this.species === 'setosa') {
          div.style.transform = 'scale(1)';
        }
      });

      const animate = () => {
        const bounds = container.getBoundingClientRect();
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.width > bounds.width || this.x < 0) this.speedX *= -1;
        if (this.y + this.height > bounds.height || this.y < 0) this.speedY *= -1;

        div.style.left = `${this.x}px`;
        div.style.top = `${this.y}px`;

        requestAnimationFrame(animate);
      };

      animate();
    }
  }

  const mainContainer = document.createElement('div');
  mainContainer.style.display = 'flex';
  mainContainer.style.flexDirection = 'column';
  mainContainer.style.gap = '40px';
  mainContainer.style.padding = '30px';
  mainContainer.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(mainContainer);

  function createSpeciesRow(speciesName) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.height = '180px';
    wrapper.style.border = '2px solid #ccc';
    wrapper.style.background = '#f8f8f8';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '10px';
    wrapper.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    const label = document.createElement('div');
    label.textContent = speciesName;
    label.style.position = 'absolute';
    label.style.top = '10px';
    label.style.left = '20px';
    label.style.zIndex = '10';
    label.style.fontSize = '28px';
    label.style.fontWeight = 'bold';
    label.style.color = '#333';
    label.style.background = 'rgba(255,255,255,0.8)';
    label.style.padding = '5px 10px';
    label.style.borderRadius = '6px';

    wrapper.appendChild(label);
    return wrapper;
  }

  const speciesGroups = {};
  irisesWithColorsSorted.forEach(iris => {
    if (!speciesGroups[iris.species]) {
      speciesGroups[iris.species] = [];
    }
    speciesGroups[iris.species].push(iris);
  });

  for (const species in speciesGroups) {
    const rowContainer = createSpeciesRow(species);
    mainContainer.appendChild(rowContainer);

    speciesGroups[species].forEach(irisObj => {
      const iris = new Iris(irisObj);
      iris.render(rowContainer);
    });
  }
};
