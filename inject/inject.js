//PolrFlare#7193

var getLink = window.location.href;

if (getLink.includes("twitter.com")) {
  console.log("%c <theme>enabled</theme>", "background: black; color: white;");
  console.log("%c injected theme engine into " + getLink, "color: #34b1eb;");
}

//global variables
var chromaKeyFrame = `
@keyframes rainbow-cycle {
    0%   { --themeengine: hsl(0, 100%, 50%); }      /* Red */
    2%   { --themeengine: hsl(7.2, 100%, 50%); }    /* Very slight orange */
    4%   { --themeengine: hsl(14.4, 100%, 50%); }   /* Orange */
    6%   { --themeengine: hsl(21.6, 100%, 50%); }   /* Orange-Yellow */
    8%   { --themeengine: hsl(28.8, 100%, 50%); }   /* Yellow */
    10%  { --themeengine: hsl(36, 100%, 50%); }     /* Yellow-Green */
    12%  { --themeengine: hsl(43.2, 100%, 50%); }   /* Green-Yellow */
    14%  { --themeengine: hsl(50.4, 100%, 50%); }   /* Green */
    16%  { --themeengine: hsl(57.6, 100%, 50%); }   /* Green-Cyan */
    18%  { --themeengine: hsl(64.8, 100%, 50%); }   /* Cyan-Green */
    20%  { --themeengine: hsl(72, 100%, 50%); }     /* Cyan */
    22%  { --themeengine: hsl(79.2, 100%, 50%); }   /* Cyan-Blue */
    24%  { --themeengine: hsl(86.4, 100%, 50%); }   /* Blue-Cyan */
    26%  { --themeengine: hsl(93.6, 100%, 50%); }   /* Blue */
    28%  { --themeengine: hsl(100.8, 100%, 50%); }  /* Blue-Indigo */
    30%  { --themeengine: hsl(108, 100%, 50%); }    /* Indigo */
    32%  { --themeengine: hsl(115.2, 100%, 50%); }  /* Indigo-Purple */
    34%  { --themeengine: hsl(122.4, 100%, 50%); }  /* Purple */
    36%  { --themeengine: hsl(129.6, 100%, 50%); }  /* Purple-Red */
    38%  { --themeengine: hsl(136.8, 100%, 50%); }  /* Red-Purple */
    40%  { --themeengine: hsl(144, 100%, 50%); }    /* Red */
    42%  { --themeengine: hsl(151.2, 100%, 50%); }  /* Red-Pink */
    44%  { --themeengine: hsl(158.4, 100%, 50%); }  /* Pink-Red */
    46%  { --themeengine: hsl(165.6, 100%, 50%); }  /* Pink */
    48%  { --themeengine: hsl(172.8, 100%, 50%); }  /* Pink-Orange */
    50%  { --themeengine: hsl(180, 100%, 50%); }    /* Orange */
    52%  { --themeengine: hsl(187.2, 100%, 50%); }  /* Orange-Yellow */
    54%  { --themeengine: hsl(194.4, 100%, 50%); }  /* Yellow */
    56%  { --themeengine: hsl(201.6, 100%, 50%); }  /* Yellow-Green */
    58%  { --themeengine: hsl(208.8, 100%, 50%); }  /* Green */
    60%  { --themeengine: hsl(216, 100%, 50%); }    /* Green-Cyan */
    62%  { --themeengine: hsl(223.2, 100%, 50%); }  /* Cyan */
    64%  { --themeengine: hsl(230.4, 100%, 50%); }  /* Cyan-Blue */
    66%  { --themeengine: hsl(237.6, 100%, 50%); }  /* Blue */
    68%  { --themeengine: hsl(244.8, 100%, 50%); }  /* Blue-Indigo */
    70%  { --themeengine: hsl(252, 100%, 50%); }    /* Indigo */
    72%  { --themeengine: hsl(259.2, 100%, 50%); }  /* Indigo-Purple */
    74%  { --themeengine: hsl(266.4, 100%, 50%); }  /* Purple */
    76%  { --themeengine: hsl(273.6, 100%, 50%); }  /* Purple-Red */
    78%  { --themeengine: hsl(280.8, 100%, 50%); }  /* Red-Purple */
    80%  { --themeengine: hsl(288, 100%, 50%); }    /* Red */
    82%  { --themeengine: hsl(295.2, 100%, 50%); }  /* Red-Pink */
    84%  { --themeengine: hsl(302.4, 100%, 50%); }  /* Pink */
    86%  { --themeengine: hsl(309.6, 100%, 50%); }  /* Pink-Orange */
    88%  { --themeengine: hsl(316.8, 100%, 50%); }  /* Orange */
    90%  { --themeengine: hsl(324, 100%, 50%); }    /* Orange-Yellow */
    92%  { --themeengine: hsl(331.2, 100%, 50%); }  /* Yellow */
    94%  { --themeengine: hsl(338.4, 100%, 50%); }  /* Yellow-Green */
    96%  { --themeengine: hsl(345.6, 100%, 50%); }  /* Green */
    98%  { --themeengine: hsl(352.8, 100%, 50%); }  /* Green-Cyan */
    100% { --themeengine: hsl(0, 100%, 50%); }      /* Back to Red */
}
`

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

    else if (context.includes("chroma")) {

      console.log("%c set color to chroma cycle background: black; color: white");

      var css = chromaKeyFrame;

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
      } else if (getColor.includes("chroma")) {

      console.log("chroma cycle!");
      var css = `
      div[data-testid="primaryColumn"] {
        box-shadow: 0 0 ` + getRadius + `px` + ' var(--chroma)' + `;
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

  else if (context_.includes("chroma")) {

    console.log("%c set color to chroma cycle background: black; color: white");

    var css = chromaKeyFrame;

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
    } else if (getColor.includes("chroma")) {

      var css = `
      div[data-testid="primaryColumn"] {
        box-shadow: 0 0 ` + getRadius + `px` + ' var(--chroma)' + `;
      }
      `

        setBorderLight(css);
      }

  }
});
