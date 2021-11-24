const $originText = document.getElementById("origin-text");
const $obfuscatedText = document.getElementById("obfuscated-text");
const $copyBtn = document.getElementById("copy-btn");

function init() {
  obfuscates();
  $originText.value = `이곳에 입력된 텍스트는 아래에서 외국인들이 알아보기 힘들게 변경됩니다.`
  $originText.dispatchEvent(new Event('input'))
  $copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText($obfuscatedText.innerText)
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  });
}
init();

function obfuscates() {
  let qr_timeout = null;
  $originText.addEventListener("input", () => {
    if (qr_timeout != null) {
      clearTimeout(qr_timeout);
    }
    qr_timeout = setTimeout(function () {
      let result = obfuscatedText($originText.value);
      $obfuscatedText.innerText = result;
    }, 500);
  });
  // obfuscatedText
  // input text
  // obfuscates the text and return
  function obfuscatedText(origin) {
    let result = new Array(origin.length);
    origin.split("").forEach((v, i) => {
      result[i] = obfuscatedChar(v);
    });
    return result.join("");
  }

  // obfuscatedChar
  // input only one character
  // obfuscates charater and return
  function obfuscatedChar(char) {
    const firstCode = 44032;
    const lastCode = firstCode + 11171;
    let cc = char.charCodeAt(0);
    // if it is not korean just return origin character
    if (!(cc >= firstCode && cc <= lastCode)) {
      return char;
    }
    return String.fromCharCode(cc + rand());
  }
  // rand return a number from 1 to 28
  function rand() {
    return Math.floor(Math.random() * 2) + 1;
  }
}
