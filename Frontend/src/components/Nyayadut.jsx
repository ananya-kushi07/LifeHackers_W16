//Nyayadut.jsx

import { useEffect } from "react";

const Nyaya = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState") !== "initialized"){
          window.chatbase = (...arguments) => {
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments);
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if(prop === "q") { return target.q }
              return (...args) => target(prop, ...args);
            }
          });
        }
        const onLoad = function(){
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "V0X8gNmXAWSUjGJ-yRlyz";
          script.domain = "www.chatbase.co";
          document.body.appendChild(script);
        };
        if(document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible component needed
};

export default Nyaya;