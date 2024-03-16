  // Define Stimulus controllers
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

// Ambush encounter

application.register("rolldmg", class extends Stimulus.Controller {
    static targets = ["value"];

    roll() {
      let newValue = parseInt(Math.floor(Math.random() * 10) + 1) + 2;
      this.valueTarget.textContent = newValue;
    }
  });

  application.register("attack", class extends Stimulus.Controller {
    static targets = ["value"];

    atk() {
      let newValue = parseInt(Math.floor(Math.random() * 20) + 1) + 1;
      this.valueTarget.textContent = newValue;
    }
  });
