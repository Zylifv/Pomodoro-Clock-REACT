let countDown;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 5,
      sessionTime: 25,
      sessionMinutes: 25,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
      session: "Session",
    };
  }

  incrementBreakTime = () => {
    if (this.state.breakTime < 60 && this.state.timerIsOn === false) {
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
    }
  };

  decrementBreakTime = () => {
    if (this.state.breakTime > 1 && this.state.timerIsOn === false) {
      this.setState({
        breakTime: this.state.breakTime - 1,
      });
    }
  };

  incrementSession = () => {
    if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      this.state.sessionTime < 9
    ) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        sessionMinutes: "0" + (parseInt(this.state.sessionTime) + 1),
        sessionSeconds: "00",
      });
    } else if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      parseInt(this.state.sessionTime) >= 9
    ) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        sessionMinutes: parseInt(this.state.sessionTime) + 1,
        sessionSeconds: "00",
      });
    }
  };

  decrementSession = () => {
    if (
      this.state.sessionTime > 1 &&
      this.state.sessionTime > 10 &&
      this.state.timerIsOn === false
    ) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        sessionMinutes: this.state.sessionMinutes - 1,
        sessionSeconds: "00",
      });
    } else if (this.state.sessionTime > 1 && this.state.sessionTime <= 10) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        sessionMinutes: "0" + (this.state.sessionMinutes - 1),
        sessionSeconds: "00",
      });
    }
  };
  
  timer = () => {
    if (this.state.timerIsOn === false) {
      this.setState({
        timerIsOn: true
      })
      let seconds =
      this.state.sessionMinutes * 60 + parseInt(this.state.sessionSeconds);
      
      const now = Date.now();
      const then = now + seconds * 1000;
      
      countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(this.state.sessionMinutes === "00" && this.state.sessionSeconds === "00") {
          document.getElementById("beep").play();
        }

        if (secondsLeft < 0) {
          clearInterval(countDown);
          this.break();
          return;
        }

        this.displayTimeLeft(secondsLeft);
      }, 1000);
    } else {
      clearInterval(countDown);
        let minuteToPause = this.state.sessionMinutes;
        let secondsToPause = this.state.sessionSeconds;
        this.setState({
          timerIsOn: false,
          sessionMinutes: minuteToPause,
          sessionSeconds: secondsToPause,
        });
      }
    };

  displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    if (remainderSeconds >= 10 && minutes >= 10) {
      this.setState({
        sessionMinutes: minutes,
        sessionSeconds: remainderSeconds,
      });
    } else if (remainderSeconds <= 9) {
      this.setState({
        sessionMinutes: "0" + minutes,
        sessionSeconds: "0" + remainderSeconds,
      });
    } else {
      this.setState({
        sessionMinutes: "0" + minutes,
        sessionSeconds: remainderSeconds,
      });
    }
  };

  break = () => {
    if(this.state.pause === false) {
        if(this.state.breakTime > 9){
           this.setState({
             session: "Break",
             sessionMinutes: this.state.breakTime,
             sessionSeconds: "00",
             timerIsOn: false,
             pause: true
           })
           this.timer()
         } else {
             this.setState({
               session: "Break",
               sessionMinutes: "0" + this.state.breakTime,
               sessionSeconds: "00",
               timerIsOn: false,
               pause: true,
             });
             this.timer();
           }
          } else {
              if(this.state.sessionTime > 9) {
                this.setState({
                  session: "Session",
                  sessionMinutes: this.state.sessionTime,
                  sessionSeconds: "00",
                  timerIsOn: false,
                  pause: false,
                });
                  this.timer();
              } else {
                  this.setState({
                    session: "Session",
                    sessionMinutes: "0" +this.state.sessionTime,
                    sessionSeconds: "00",
                    timerIsOn: false,
                    pause: false,
                  });
                this.timer();
              }
            }
          };

  resetTime = () => {
    clearInterval(countDown);
      this.setState({
        session: "Session",
        breakTime: 5,
        sessionTime: 25,
        sessionMinutes: 25,
        sessionSeconds: "00",
        timerIsOn: false,
        pause: false,
      });
    document.getElementById("beep").currentTime = 0;
    document.getElementById("beep").pause();
  };

  render() {
    return (
      <div>
        <h1>25 + 5 Clock</h1>
        
        <div id="session-sec">
                <button id="session-decrement" onClick={() => this.decrementSession()}>-</button>
                <div id="session-label">Session Length: <p id="session-length">{this.state.sessionTime}</p></div>
                <button id="session-increment" onClick={() => this.incrementSession()}>+</button>
              </div>
              
      <div id="wrap">
          <div id="timer-label">{this.state.session}</div>
            <div id="time-left">
              <audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" type="audio/mp3"></audio>
              {this.state.sessionMinutes}:{this.state.sessionSeconds}
            </div>
            <div id="button-timer"></div>
              <div id="start_stop" onClick={() => this.timer()}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Play_Pause_icon_2283501.svg" id="play-pause-img" width="60"/></div>
              <div id="reset" onClick={() => this.resetTime()}><img src="https://cdn-icons-png.flaticon.com/512/1594/1594849.png" width="33" /></div>
          </div>

        
        <div id="break-sec">
          
              <div id="break">
                <button id="break-decrement" onClick={() => this.decrementBreakTime()}>-</button>
                <div id="break-label">Break Length: <p id="break-length">{this.state.breakTime}</p></div>
                <button id="break-increment" onClick={() => this.incrementBreakTime()}>+</button>
              </div>
        </div>
        
    </div>
    );
  }
}

React.render(<App />, document.getElementById("root"));
