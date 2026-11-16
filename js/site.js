function isMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function initFB() {
    let script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.getElementsByTagName("body")[0].appendChild(script);
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: '1193643835172801',
            version: 'v11.0'
        });
    };
}

function share() {
    navigator.share({
            url: window.location.href
        }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
}

function shareFB() {
    window.FB.ui({
            method: 'share',
            href: window.location.href
        },
        function(response) {
            console.log(response)
        });
}

function shareTeleUrl() {
    return `https://t.me/share/url?url=${window.location.href}`;
}

$(document).ready(function() {
    let ismb = isMobile();
    let divShareDesktop = document.getElementById("divShareDesktop")
    let divShareMobile = document.getElementById("divShareMobile")
    if (divShareDesktop) {
        divShareDesktop.style.display = ismb ? "none" : "block"
        $("#teleShareUrl").attr("href", shareTeleUrl());
    }
    if (divShareMobile) {
        divShareMobile.style.display = ismb ? "block" : "none"
    }

    initFB();
    if ($("#hidHasCert").val() == "True" && $("#hidHasUploadCert").val() == "False") saveCertificate();
})

function saveCertificate() {
    html2canvas(document.getElementById("divCertificate"), {
        backgroundColor: null,
        scale: 2
    }).then(function(canvas) {
        let file = dataURLtoFile(canvas.toDataURL("image/png"), $("#hidCertNo").val() + '.png');
        let formData = new FormData();
        formData.append("file", file);
        $.ajax({
            type: "POST",
            url: "/api/upload/certificate",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            data: formData,
            success: function(response) {},
            error: function(response) {

            },
            complete: function() {}
        })
    });
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}