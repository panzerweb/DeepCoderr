
const preview = document.getElementById("file-preview");
const fileInput = document.getElementById("choose-avatar");
const saveBtn = document.getElementById("save-avatar-btn");

// Check if avatar is already saved in localStorage
const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) {
    preview.src = savedAvatar;
}

// Preview selected image
export function previewAvatar(){
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            saveBtn.classList.remove("d-none");
        };
        reader.readAsDataURL(file);
    }
}

// Save avatar to localStorage
export function saveAvatar() {
    const currentSrc = preview.src;
    if (currentSrc) {
        localStorage.setItem("userAvatar", currentSrc);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Avatar Saved!",
            showConfirmButton: false,
            timer: 1500
        });

        saveBtn.classList.add("d-none");
    }

}