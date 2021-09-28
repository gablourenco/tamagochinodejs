const logUpdate = require("log-update");
const readline = require("readline");
const { between, generateRandomSpace } = require("./non");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.emitKeypressEvents(process.stdin, rl);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.on("keypress", (character, key) => {
  if (key.name === "f") {
    setFood();
    return;
  }
  if (key.name === "c") {
    setClean();
    return;
  }
  if (key.name === "h") {
    setHeal();
    return;
  }
});

rl.on("close", () => {
  process.exit(0);
});

const bear = ["ʕ•ᴥ•ʔ", "ʕ·ᴥ·ʔ", "ʕºᴥºʔ"];
const hunger = ["(￣﹃￣)", "ԅ(¯﹃ ¯ԅ)", "(x﹃x)", "(´ڡ`)"];
const malade = ["(๑⁺᷄д⁺᷅๑)"];
const sale = ["(ತ◞౪◟ತ‵)", "(◕ﻌ◕*)"];
const state = {
  life: 100,
  time: 0,
  hungry: 120,
  sick: false,
  clean: 200,
};
function getOurs() {
  return generateRandomSpace() + bear[Math.floor(Math.random() * bear.length)];
}
function getHungry() {
  if (state.hungry > 100) {
    return "(´ڡ`) rassasié  🍗 " + state.hungry;
  }

  if (state.hungry < 100 && state.hungry > 50) {
    return (
      '(￣﹃￣) j\'ai faim, appuie sur "f" pour me donner a manger 🍗 ' +
      state.hungry
    );
  }
  if (state.hungry < 50 && state.hungry > 0) {
    return (
      ' ԅ(¯﹃ ¯ԅ) a l\'aide, je suis en train de crever de faim, appuis sur "f" 🍗 ' +
      state.hungry
    );
  }
  if (state.hungry === 0) {
    return "(x﹃x)";
  }
}
function getLifeBarre() {
  if (state.life == 100) {
    return "❤ ❤ ❤ " + state.life;
  }

  if (state.life < 100 && state.life > 50) {
    return "  ❤ ❤ ♡ " + state.life;
  }

  if (state.life < 50 && state.life > 0) {
    return "  ❤ ♡ ♡ " + state.life;
  }

  if (state.life === 0) {
    return " RIP ";
  }
}
function getSick() {
  if (state.sick == true) {
    return "(๑⁺᷄д⁺᷅๑) je suis malade , soigne moi avec la touche h ";
  }
}
function getClean() {
  if (state.clean > 170) {
    return "(◕ﻌ◕*) je suis propre  🚿 " + state.clean;
  }
  if (state.clean < 170) {
    return (
      '(◕ﻌ◕*) je ne suis pas sale mais tu peux me laver avec la touche "c"  🚿 ' +
      state.clean
    );
  }
  if (state.clean < 100) {
    return (
      ' (ತ◞౪◟ತ‵) je suis sale , appuie sur "c" pour me laver' + state.clean
    );
  }
}
function setClean() {
  if (state.clean < 190) {
    state.clean = state.clean + 10;
  }
}
function setFood() {
  if (state.hungry < 110) {
    state.hungry = state.hungry + 10;
  }
}
function setHeal() {
  if (state.life < 90) {
    state.life = state.life + 10;
  }
  state.sick = false;
}

// function getLifeBarre() {

//     const barreCompleteChar = '='
//     const barreTroisQuart = '-'
//     const total = 60
//     const plein = (state.life + total) / 100
//     const vide = total - plein
//     if(total - plein == 0) {
//         'dead'
//     }
//     return new Array(40).fill(barreCompleteChar).join('') + new Array(20).fill(barreTroisQuart).join('')
// }
setInterval(function () {
  const espace = [
    getOurs(),
    "",
    getLifeBarre(),
    "",
    getClean(),
    getSick(),
    getHungry(),
  ];
  logUpdate(espace.join("\n"));
}, 700);

setInterval(function () {
  const sick = between(0, 200);
  state.time + -1;
  if (sick === 57) {
    state.sick = true;
  }
  if (state.sick && state.time % 3) {
    state.life--;
  }
  if (state.clean > 0 && state.clean !== 0) {
    state.clean--;
  }
  if (state.time % 3 === 0 && state.hungry !== 0) {
    state.hungry--;
  }
  if (state.hungry === 0) {
    state.clean--;
    state.life--;
  }
  // if (state.sick === true) {
  //     state.life--
  // }
}, 500);
