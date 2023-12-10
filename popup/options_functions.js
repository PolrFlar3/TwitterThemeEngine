//PolrFlare#7193

document.addEventListener("DOMContentLoaded", function () {

  //set font
  var fontEnabled = false;
  document.getElementById("set_font").addEventListener("click", function() {

    var getButton = document.getElementById("set_font");

    var old_ = "OLD FONT";
    var new_ = "NEW FONT";
    
    getButton.style.backgroundColor = fontEnabled ? "rgb(25, 25, 25)" : "";
    getButton.style.textShadow = fontEnabled ? "0 0 10px white" : "";
    getButton.innerText = fontEnabled ? old_ : new_;
    var switch_ = (getButton.innerText == "OLD FONT") ? "helvetica" : "new";
    fontEnabled = !fontEnabled;

    if (getButton.innerText == "OLD FONT") {
      chrome.storage.sync.set({setText: old_}, function() {});
      
    } else if (getButton.innerText == "NEW FONT") {
      chrome.storage.sync.set({setText: new_}, function() {});
    }

    var setWindow = { active: true, currentWindow: true}
    chrome.tabs.query(setWindow, catchTwitter);
    function catchTwitter(tabs) {
      var setInput = "font" + switch_;
      var inputMsg = setInput;
      chrome.tabs.sendMessage(tabs[0].id, inputMsg);
    }
  })

  //set color
  document.getElementById("set_color").addEventListener("click", function() {

    var inputBar = document.getElementById("input_value_1");
    var getInput = inputBar.value;

    chrome.storage.sync.set({saveColor: getInput}, function() {});

    var setWindow = { active: true, currentWindow: true}
    chrome.tabs.query(setWindow, catchTwitter);
    function catchTwitter(tabs) {
      var setInput = "xcolor" + getInput;
      var inputMsg = setInput;
      chrome.tabs.sendMessage(tabs[0].id, inputMsg);
    }
  })

  //set border light on/off
  var lightEnabled = false;
  document.getElementById("set_light").addEventListener("click", function() {

    var getButton = document.getElementById("set_light");

    var on_ = "ON";
    var off_ = "OFF";
    
    getButton.style.backgroundColor = lightEnabled ? "white" : "";
    getButton.style.textShadow = lightEnabled ? "0 0 10px black" : "";
    getButton.innerText = lightEnabled ? on_ : off_;
    var switch_ = (getButton.innerText == "ON") ? "on" : "off";
    lightEnabled = !lightEnabled;


    if (getButton.innerText == "OFF") {
      chrome.storage.sync.set({set_light: off_}, function() {});
      
    } else if (getButton.innerText == "ON") {
      chrome.storage.sync.set({set_light: on_}, function() {});

    }
    
  })

  document.getElementById("light_set").addEventListener("click", function() {

    var getButton = document.getElementById("set_light");

    var inputBar_2 = document.getElementById("input_value_2");
    var getInput_2 = inputBar_2.value;
    chrome.storage.sync.set({light_color: getInput_2}, function() {});

    var inputBar_3 = document.getElementById("input_value_3");
    var getInput_3 = inputBar_3.value;
    chrome.storage.sync.set({light_radius: getInput_3}, function() {});

    if (getButton.innerText == "OFF") {
      var optionArray = ["light_array"];
      optionArray.push("off");
      console.log(optionArray);

      var setWindow = { active: true, currentWindow: true}
      chrome.tabs.query(setWindow, catchTwitter);
      function catchTwitter(tabs) {
      var setInput = optionArray;
      var inputMsg = setInput;
      chrome.tabs.sendMessage(tabs[0].id, inputMsg);
      }
      
    } else if (getButton.innerText == "ON") {
      var optionArray = ["light_array"];
      optionArray.push("on");
      optionArray.push(getInput_2);
      optionArray.push(getInput_3);

      var getRadius = optionArray[3];
      var numRadius = parseFloat(getRadius);

      if (numRadius > 60) {
        optionArray[3] = "60";
      }

      console.log(optionArray);

      var setWindow = { active: true, currentWindow: true}
      chrome.tabs.query(setWindow, catchTwitter);
      function catchTwitter(tabs) {
      var setInput = optionArray;
      var inputMsg = setInput;
      chrome.tabs.sendMessage(tabs[0].id, inputMsg);
      }
    }
    
  })
  
  //storage handler
  chrome.storage.sync.get(["setText"], function(result) {
    
    var font_ = result.setText;
    var getButton = document.getElementById("set_font");

    if (font_ == "OLD FONT") {
      getButton.innerText = "OLD FONT";

      getButton.style.backgroundColor = "rgb(25, 25, 25)";
      getButton.style.textShadow = "0 0 10px white";
    }
    else if (font_ == "NEW FONT") {
      getButton.innerText = "NEW FONT";

      getButton.style.backgroundColor = "rgb(255, 255, 255)";
      getButton.style.textShadow = "0 0 10px black";
    }
  });

  chrome.storage.sync.get(["saveColor"], function(result) {

    var color_ = result.saveColor;
    var inputBar = document.getElementById("input_value_1");

    inputBar.value = color_;

    if (inputBar.value == "undefined") {
      inputBar.value = "";
    }

  });

  chrome.storage.sync.get(["set_light"], function(result) {
    
    var light_ = result.set_light;
    var getButton = document.getElementById("set_light");
    console.log("was set to " + light_);

    if (light_ == "OFF") {
      getButton.innerText = "OFF";

      getButton.style.backgroundColor = "rgb(25, 25, 25)";
      getButton.style.textShadow = "0 0 10px white";
    }
    else if (light_ == "ON") {
      getButton.innerText = "ON";

      getButton.style.backgroundColor = "rgb(255, 255, 255)";
      getButton.style.textShadow = "0 0 10px black";
    }
  });

  chrome.storage.sync.get(["light_color"], function(result) {

    var color_ = result.light_color;
    var inputBar = document.getElementById("input_value_2");

    inputBar.value = color_;

    if (inputBar.value == "undefined") {
      inputBar.value = "";
    }
  });

  chrome.storage.sync.get(["light_radius"], function(result) {

    var radius_ = result.light_radius;
    var inputBar = document.getElementById("input_value_3");

    inputBar.value = radius_;

    if (inputBar.value == "undefined") {
      inputBar.value = "";
    }
  });

})