//PolrFlare#7193

var getLink = window.location.href;

if (getLink.includes("twitter.com")) {
  console.log("%c <theme>enabled</theme>", "background: black; color: white;");
  console.log("%c injected theme engine into " + getLink, "color: #34b1eb;");
}



//init elements
const removeElement = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

//injects css into page
const addStyles = (id, css) => {
  // First remove before adding
  removeElement(id);

  const head = document.querySelector("head");
  const style = document.createElement("style");

  style.id = id;
  style.textContent = `${css}`;
  head.appendChild(style);
};

const injectStyles = () => {
  const head = document.querySelector("head");
  const mainStyleSheet = document.createElement("link");

  mainStyleSheet.rel = "stylesheet";
  mainStyleSheet.type = "text/css";
  mainStyleSheet.href = chrome.runtime.getURL("inject/injectStyles.css");
  head.appendChild(mainStyleSheet);
};

injectStyles();



//options

//font
const setFont = (css) => {
  addStyles(
    "setFont",
    css
  );
};

const setColor = (css) => {
  addStyles(
    "setColor",
    css
  )
}

const setBorderLight = (css) => {
  addStyles(
    "setBorderLight",
    css
  )
}



//message handler
chrome.runtime.onMessage.addListener(catchMessage);

function catchMessage(message, sender, sendResponse) {

  console.log(message);

  if (message.includes("font")) {

    var context = message.split("font").pop();
    chrome.storage.sync.set({setFont: context}, function() {});

    if (context == "helvetica") {

      console.log("%c set to helvetica", "background: black; color: white");

      var css = `
      .r-37j5jr {
        font-family: Helvetica
      }

      .css-901oao {
        font-family: Helvetica
      }
      `

      setFont(css);
    }

    else if (context == "new") {

      console.log("%c set to new font", "background: black; color: white");
  
      removeElement("setFont");
  
    }
     
  } else if (message.includes("xcolor")) {

    var context = message.split("xcolor").pop();
    chrome.storage.sync.set({setColor: context}, function() {});

    if (context.includes("#")) {

      console.log("%c set color to " + context, "background: black; color: white");
      var colorHEX = context;

      var css = `
      :root {
        --themeengine:  ` + colorHEX + ` !important
      }
      `

      setColor(css);
    }

    else if (context.includes(",")) {

      console.log("%c set color to " + context, "background: black; color: white");
      var colorRGB = context;

      var css = `
      :root {
        --themeengine:  rgb(` + colorRGB + `) !important
      }
      `

      setColor(css);

    }

  } else if (message.includes("light_array")) {

    var context = message;
    chrome.storage.sync.set({setLight: context}, function() {});

    if (context[1] == "off") {

      removeElement("setBorderLight");

    } else if (context[1] == "on") {
      
      var getColor = context[2];
      var getRadius = context[3];


      if (getColor.includes("#")) {

        var css = `
        div[data-testid="primaryColumn"] {
          box-shadow: 0 0 ` + getRadius + "px " + getColor + `;
        }
        `
        
        setBorderLight(css);

      } else if (getColor.includes(",")) {

        var css = `
        div[data-testid="primaryColumn"] {
          box-shadow: 0 0 ` + getRadius + `px rgb(` + getColor + `);
        }
        `
        
        setBorderLight(css);
      }

    }

  }
  
}



//chrome storage handler(preset saver)

//font change
chrome.storage.sync.get(["setFont"], function(preset) {

  var context_ = preset.setFont;

  if (context_ == "helvetica") {

    console.log("%c set to helvetica", "background: black; color: white");

    var css = `
    .r-37j5jr {
      font-family: Roboto-Regular,Helvetica,Arial,sans-serif
    }

    .css-901oao {
      font-family: Roboto-Regular,Helvetica,Arial,sans-serif
    }
    `

    setFont(css);
  }

  else if (context_ == "new") {

    console.log("%c set to new font", "background: black; color: white");

    removeElement("setFont");

  }

});

//color theme change
chrome.storage.sync.get(["setColor"], function(preset) {

  var context_ = preset.setColor;

  if (context_.includes("#")) {

    console.log("%c set color to " + context_, "background: black; color: white");
    var colorHEX = context_;

    var css = `
      :root {
        --themeengine:  ` + colorHEX + ` !important
      }
      `

    setColor(css);
  }

  else if (context_.includes(",")) {

    console.log("%c set color to " + context_, "background: black; color: white");
    var colorRGB = context_;

    var css = `
    :root {
      --themeengine:  rgb(` + colorRGB + `) !important
    }
    `

    setColor(css);

  }

});

chrome.storage.sync.get(["setLight"], function(preset) {

  var context_ = preset.setLight;

  if (context_[1] == "off") {

    removeElement("setBorderLight");

  } else if (context_[1] == "on") {
    
    var getColor = context_[2];
    var getRadius = context_[3];


    if (getColor.includes("#")) {

      var css = `
      div[data-testid="primaryColumn"] {
        box-shadow: 0 0 ` + getRadius + "px " + getColor + `;
      }
      `
      
      setBorderLight(css);

    } else if (getColor.includes(",")) {

      var css = `
      div[data-testid="primaryColumn"] {
        box-shadow: 0 0 ` + getRadius + `px rgb(` + getColor + `);
      }
      `
      
      setBorderLight(css);
    }

  }
});