const application = Stimulus.Application.start();

application.register("counter", class extends Stimulus.Controller {
  static targets = ["value"];

  increment() {
    const newValue = parseInt(this.valueTarget.textContent, 10) + 1;
    this.valueTarget.textContent = newValue;
  }

  decrement() {
    let newValue = parseInt(this.valueTarget.textContent, 10) - 1;
    newValue = Math.max(newValue, 0); // Ensure newValue doesn't go below 0
    this.valueTarget.textContent = newValue;
  }
});

application.register("fear", class extends Stimulus.Controller {
  static targets = ["checkbox"];

  toggle(event) {
    const checkedCount = this.checkboxTargets.filter(checkbox => checkbox.checked).length;
    if (checkedCount > 10) {
      event.preventDefault();
    }
  }
});

application.register("countdown", class extends Stimulus.Controller {
  static targets = ["value"];

  decrease() {
    let newValue = parseInt(this.valueTarget.textContent, 10) - 1;
    newValue = Math.max(newValue, 0); // Ensure newValue doesn't go below 0
    this.valueTarget.textContent = newValue;
  }

  increase() {
    let newValue = parseInt(this.valueTarget.textContent, 10) + 1;
    newValue = Math.min(newValue, 8); // Limit newValue to maximum of 8
    this.valueTarget.textContent = newValue;
  }
});

application.register("monster", class extends Stimulus.Controller {
  static targets = ["title", "duplicateBtn"];
  count = 1;

  duplicate() {
    const clonedMonster = this.element.cloneNode(true);
    this.count++;
    const newId = `monster-${this.count}`;
    clonedMonster.querySelector('[data-target="monster.title"]').textContent += ` #${this.count}`;
    clonedMonster.id = newId;
    clonedMonster.classList.add('monster-block');
    this.element.parentNode.insertBefore(clonedMonster, this.element.nextSibling);

    // Remove the Duplicate Monster button from the cloned monster
    clonedMonster.querySelector('[data-target="monster.duplicateBtn"]').remove();
  }
});

application.register("rolldmg", class extends Stimulus.Controller {
  static targets = ["value"];

  roll() {
    let diceRoll1 = Math.floor(Math.random() * 8) + 1;
    let diceRoll2 = Math.floor(Math.random() * 8) + 1;
    let newValue = diceRoll1 + diceRoll2 + 1;
    this.valueTarget.textContent = newValue;
  }
rollambush() {
    let diceRoll1 = Math.floor(Math.random() * 8) + 1;
    let diceRoll2 = Math.floor(Math.random() * 8) + 1;
    let newValue = diceRoll1 + diceRoll2 + 4;
    this.valueTarget.textContent = newValue;
  }
  
  rollmag() {
    let diceRoll1 = Math.floor(Math.random() * 8) + 1;
    let diceRoll2 = Math.floor(Math.random() * 8) + 1;
    let newValue = diceRoll1 + diceRoll2;
    this.valueTarget.textContent = newValue;
  }

  rolltrix() {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    let newValue = diceRoll + 3;
    this.valueTarget.textContent = newValue;
  }

  rollSkel() {
    let diceRoll1 = Math.floor(Math.random() * 6) + 1;
    let diceRoll2 = Math.floor(Math.random() * 6) + 1;
    let diceRoll3 = Math.floor(Math.random() * 6) + 1;
    let newValue = diceRoll1 + diceRoll2 + diceRoll3 + 2;
    this.valueTarget.textContent = newValue;
  }

  rollDrain() {
    let diceRoll = Math.floor(Math.random() * 10) + 1;
    let newValue = diceRoll + 4;
    this.valueTarget.textContent = newValue;
  }
 rollDrainMag() {
    let diceRoll = Math.floor(Math.random() * 20) + 1;
    let newValue = diceRoll + 2;
    this.valueTarget.textContent = newValue;
  }
  rollThief() {
    let diceRoll1 = Math.floor(Math.random() * 6) + 1;
    let diceRoll2 = Math.floor(Math.random() * 6) + 1;
    let diceRoll3 = Math.floor(Math.random() * 6) + 1;
    let newValue = diceRoll1 + diceRoll2 + diceRoll3 + 1;
    this.valueTarget.textContent = newValue;
  }
});


application.register("attack", class extends Stimulus.Controller {
  static targets = ["value"];

  atk() {
    let newValue = Math.floor(Math.random() * 20) + 1;
    this.valueTarget.textContent = newValue;
  }

  atkSkel() {
    let newValue = Math.floor(Math.random() * 20) + 1;
    this.valueTarget.textContent = newValue;
  }

  atkDrain() {
    let newValue = Math.floor(Math.random() * 20) + 3;
    this.valueTarget.textContent = newValue;
  }

  atkThief() {
    let newValue = Math.floor(Math.random() * 20) + 3;
    this.valueTarget.textContent = newValue;
  }

  atktrix() {
    let newValue = Math.floor(Math.random() * 20) + 1;
    this.valueTarget.textContent = newValue;
  }
});

// Fetch the CSV file using CORS Anywhere as a proxy
  const proxyUrl = 'https://rpgmania.github.io/';
  const monstersCsvUrl = 'monsters.csv'; // Replace this URL with your CSV file URL

  fetch(proxyUrl + monstersCsvUrl)
    .then(response => response.text())
    .then(text => {
      const monstersData = text.split('\n').map(line => line.split(','));

      // Remove the header line
      monstersData.shift();

      const monstersContainer = document.querySelector('.monsters-container');

      // Loop through each line in the CSV data to create monster cards
      monstersData.forEach(monster => {
        const [name, attack, hp, description] = monster;

        const monsterCard = document.createElement('div');
        monsterCard.classList.add('max-w-lg', 'bg-white', 'rounded', 'shadow', 'p-6', 'monster-card');

        monsterCard.innerHTML = `
          <h1 class="text-2xl font-bold mb-4">${name}</h1>
          <div class="mb-4">
            <p><strong>Attack</strong>: ${attack}</p>
            <p><strong>HP</strong>: ${hp}</p>
          </div>
          <p>${description}</p>
        `;

        monstersContainer.appendChild(monsterCard);
      });
    })
    .catch(error => console.error('Error fetching CSV file:', error));
