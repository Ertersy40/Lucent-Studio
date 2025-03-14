document.addEventListener('DOMContentLoaded', () => {
    const messageField = document.getElementById('message');
    const form = document.getElementById("contact-form");
    const result = document.getElementById("submission-result");

    if (messageField) {
        const adjustHeight = (element) => {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
        };

        messageField.addEventListener('input', function () {
            adjustHeight(this);
        });

        adjustHeight(messageField);
    } else {
        console.error("Element with id 'message' was not found.");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
    });
});
