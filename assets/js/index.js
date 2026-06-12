let state = [];

const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();

    state = data.map((item) => ({
      ...item,
      isActive: false,
    }));

    displayData();
  } catch (error) {
    console.log(error);
  }
};

const displayData = () => {
  const container = document.querySelector("#card-holder");
  container.innerHTML = "";

  state.forEach((faq) => {
    const card = `
        <article  class="card ${faq.isActive ? `active` : ``}">
            <div class="card-head" id="${faq.id}">
                <h2 >${faq.question}</h2>
                <button aria-label="Minimize Question">
                    ${
                      faq.isActive
                        ? `<img src="./assets/images/icon-minus.svg" alt=""  >`
                        : `<img src="./assets/images/icon-plus.svg" alt="" class />`
                    }
                </button>
            </div>
            <div class="card-body show">
                <p>
                    ${faq.answer}
                </p>
            </div>
        </article>
    `;
    container.innerHTML += card;
  });

  const btns = document.querySelectorAll(".card-head");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.id);

      state = state.map((item) => ({
        ...item,
        isActive: item.id === id ? !item.isActive : false,
      }));
      displayData();
    });
  });
};

fetchData();
