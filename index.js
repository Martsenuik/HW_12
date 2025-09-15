class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerEl = document.querySelector(this.selector);

    this.refs = {
      days: this.timerEl.querySelector('[data-value="days"]'),
      hours: this.timerEl.querySelector('[data-value="hours"]'),
      mins: this.timerEl.querySelector('[data-value="mins"]'),
      secs: this.timerEl.querySelector('[data-value="secs"]'),
    };

    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;

      if (time <= 0) {
        clearInterval(this.intervalId);
        this.updateClockface(0, 0, 0, 0);
        return;
      }

      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((time % (1000 * 60)) / 1000);

      this.updateClockface(days, hours, mins, secs);
    }, 1000);
  }

  updateClockface(days, hours, mins, secs) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.pad(hours);
    this.refs.mins.textContent = this.pad(mins);
    this.refs.secs.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2026'),
});