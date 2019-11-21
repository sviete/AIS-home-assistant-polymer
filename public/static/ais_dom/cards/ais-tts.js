const hass = document.querySelector("home-assistant").hass;
hass.connection.subscribeEvents((event) => {
  if (
    event.data.domain === "ais_ai_service" &&
    event.data.service === "say_in_browser"
  ) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      var speech = new SpeechSynthesisUtterance(event.data.service_data.text);
      speech.lang = "pl-PL";
      window.speechSynthesis.speak(speech);
    }
    // say in frame
    try {
      window.JavascriptHandler.sayInFrame(event.data.service_data.text);
    } catch (err) {}
  }
}, "call_service");
