const fr = new FileReader(); // File Reader object

// Required DOM objects
const imgFile = document.getElementById("img-file");
const imgPrevContainer = document.getElementById("img-preview-container");
const imgPrevTarget = document.getElementById("img-preview");
const imgSubmitButton = document.getElementById("submit-btn");

let imgFileName = "image.png"; // Image file name. Fallback is "image.png"

// Get the file name from the form's file input control.
// https://stackoverflow.com/a/857662
function getFileName(src) {
  const fullPath = src.value;
  let filename;

  if (fullPath) {
    const startIndex = (fullPath.indexOf('\\') >= 0 ?
      fullPath.lastIndexOf('\\') :
      fullPath.lastIndexOf('/'));

    filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
  }
  return filename;
}

function enableSubmitButton(button) {
  button.disabled = false;
}

// Start download of image.
function downloadImage(imgData, imgName) {
  // This solution is hella hacky, I know, who cares.
  // We're doing this so we can assign a given file name to the
  // image that we want to download to the client's device.
  let dl = document.createElement("a");
  dl.href = imgData;
  dl.download = imgName;
  dl.click();
}

// This function is just here so we can call it from our form.
function markAsSpoilers() {
  downloadImage(fr.result, `SPOILER_${imgFileName}`);
}

window.onload = () => {
  document.getElementById('main-form').reset(); // reset form on load
  imgSubmitButton.disabled = true; // disable the submit button

  // as soon as a file is loaded in the form.
  fr.onload = () => {
    imgFileName = getFileName(imgFile); // get file name
    imgPrevTarget.src = fr.result; // set image preview source
  };

  // when the input file control's state is changed (when loading file),
  // unhide the image preview container, and make it visible.
  imgFile.addEventListener("change", () => {
    fr.readAsDataURL(imgFile.files[0]);
    imgPrevContainer.style.display = "block"; // make preview container visible
    enableSubmitButton(imgSubmitButton); // enable submit button, uwu
  });
};