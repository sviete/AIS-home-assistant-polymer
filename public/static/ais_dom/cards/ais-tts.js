const h = document.querySelector("home-assistant").hass;
h.connection.subscribeEvents((event) => {
  if (
    event.data.domain === "ais_ai_service" &&
    event.data.service === "say_in_browser"
  ) {
    if (window.location.hostname === "127.0.0.1") {
      return;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(event.data.service_data.text);
      speech.lang = "pl-PL";
      window.speechSynthesis.speak(speech);
    }
    // say in frame
    try {
      window.JavascriptHandler.sayInFrame(event.data.service_data.text);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
}, "call_service");
