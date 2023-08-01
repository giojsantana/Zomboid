"use strict";

const occupations = [...document.querySelectorAll(".occupation")];
const majorSkills = document.querySelector(".skills--major-skills");
const points = document.querySelector(".points");
let currentPoints = 8;

const numberOfSkill = function (occupation, dataName) {
  let num = 0;
  for (let i = 0; i < occupation.getAttribute(`data-${dataName}`); i++) {
    num += 1;
  }
  return num;
};

// display fitness and strength
occupations.forEach((occupation) => {
  occupation.addEventListener("click", function () {
    majorSkills.innerHTML = "";

    occupations.forEach((occupation) => {
      occupation.classList.remove("trait--active");
    });

    occupation.classList.add("trait--active");

    const data = occupation.dataset;
    const dataArr = [];
    const dataArrBonus = [];
    let bonusHTML = "";
    for (let d in data) {
      if (d !== "points" && !d.includes("Bonus")) {
        dataArr.push(d);
      } else if (d !== "points") {
        dataArrBonus.push(d);
      }
    }
    console.log(dataArr);
    console.log(dataArrBonus);
    console.log(data);

    dataArr.forEach((skill) => {
      console.log(skill);
      if (dataArrBonus.includes(`${skill}Bonus`)) {
        bonusHTML = occupation.getAttribute(`data-${skill}-bonus`);
      }
      majorSkills.insertAdjacentHTML(
        "beforeend",
        `
        <div class="major-skill">
          <p class="major-skill--name">${
            skill.includes("*") ? skill.split("*").join(" ") : skill
          }</p>
          <div class="major-skill--level--num">
          ${bonusHTML ? `${bonusHTML}% Bonus EXP -` : ""}
            ${numberOfSkill(occupation, skill)}
          </div>
        </div>
      `
      );
    });
    // display points
    points.innerHTML = occupation.dataset.points;
    if (points.innerHTML.includes(`-`)) {
      points.classList.add(`points-negative`);
      points.classList.remove(`points-positive`);
    } else {
      points.classList.remove(`points-negative`);
      points.classList.add(`points-positive`);
    }
    currentPoints = +points.innerHTML;
  });
});

//////////////////////////////////////////////////
// PERKS
//////////////////////////////////////////////////

const choosenTraits = [...document.querySelectorAll(".chosen-perks")];
const traits = [...document.querySelectorAll(".trait")];
choosenTraits.forEach((traitSection) => {
  [...traitSection.children].forEach((trait) => {
    trait.classList.add("hidden");
  });
});

traits.forEach((trait) =>
  trait.addEventListener("dblclick", function (e) {
    const [clickedPerkName, _, clickedPerkCost] =
      e.target.innerText.split("\n");
    traits.forEach((trait) => {
      if (trait.innerText.includes(clickedPerkName)) {
        trait.classList.toggle("hidden");
      }
    });
  })
);
