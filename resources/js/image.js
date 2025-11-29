
const preview = document.getElementById("file-preview");
const fileInput = document.getElementById("choose-avatar");
const saveBtn = document.getElementById("save-avatar-btn");

// Check if avatar is already saved in localStorage
const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) {
    preview.src = savedAvatar;
}

// Preview selected image
// Creates a canvas that would transform any picture uploaded to be 320x320 pixels
export function previewAvatar(){
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function(){
                const canvas = document.createElement("canvas");
                canvas.width = 320;
                canvas.height = 320;
                const ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0,0,320,320);

                const resizedDataUrl = canvas.toDataURL("image/png");
                preview.src = resizedDataUrl
                saveBtn.classList.remove("d-none");
            }
        
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