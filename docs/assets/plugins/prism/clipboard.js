//
// al pre tags on the page
const pres = document.getElementsByTagName("pre");

//
// reformat html of pre tags
if (pres !== null) {
  for (let i = 0; i < pres.length; i++) {
    // check if its a pre tag with a prism class
    if (isPrismClass(pres[i])) {
      // insert code and copy element
      pres[i].innerHTML = `<div class="copy">copy</div><code class="${
        pres[i].className
      }">${pres[i].innerHTML}</code>`;
    }
  }
}

//
// create clipboard for every copy element
const clipboard = new Clipboard(".copy", {
  target: trigger => {
    return trigger.nextElementSibling;
  }
});

//
// do stuff when copy is clicked
clipboard.on("success", event => {
  event.trigger.textContent = "copied!";
  setTimeout(() => {
    event.clearSelection();
    event.trigger.textContent = "copy";
  }, 2000);
});

//
// helper function
function isPrismClass(preTag) {
  return preTag.className.substring(0, 8) === "language";
}
