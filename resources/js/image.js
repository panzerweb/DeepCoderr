let splideList = document.querySelectorAll('.splide__slide');
let chooseBtn = document.getElementById("choose-avatar-btn");

chooseBtn.addEventListener("click", () => {
    let splideSection = document.querySelector(".splide");
    let saveBtn = document.getElementById("save-avatar-btn");
    let currentAvatarWrapper = document.querySelector(".supercoder-gif-card");
    console.log(currentAvatarWrapper);

    if (chooseBtn) {
        splideSection.classList.toggle("d-none");
        saveBtn.classList.toggle("d-none");
        currentAvatarWrapper.classList.toggle("d-none");
    }


})

export function saveAvatar(){
    splideList.forEach((element, index) => {
        // console.log(element);
        let containsIsVisible = element.classList.contains("is-visible");
        if (containsIsVisible) {
            let imageAvatar = element.querySelector(".supercoder-gif-card img");
            console.log(imageAvatar.src);

            const avatarObject = {
                avatar: imageAvatar.src,
            };

            Swal.fire({
                title: "Avatar Updated!",
                icon: "success",
                draggable: true,
                showConfirmButton: false,
                timer: 1000,
            })
            localStorage.setItem("current-avatar", JSON.stringify(avatarObject));
        }
    })
    setTimeout(() => {
        window.location.reload();
    }, 1000);

}

function displayCurrentAvatar() {
    let currentAvatarWrapper = document.querySelector(".supercoder-gif-card");
    currentAvatarWrapper.innerHTML = '';

    const savedAvatar = JSON.parse(localStorage.getItem("current-avatar"));
    if (saveAvatar) {
        const img = document.createElement("img");
        img.classList.add("w-100");
        img.src = savedAvatar.avatar;
        currentAvatarWrapper.appendChild(img);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    let currentAvatar = JSON.parse(localStorage.getItem("current-avatar"));
    console.log(currentAvatar);
    displayCurrentAvatar();
})