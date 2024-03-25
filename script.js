let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".room-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".gallery-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let accordions = document.querySelectorAll('.faqs .row .content .box');

accordions.forEach(acco =>{
    acco.onclick = () =>{
        accordions.forEach(subAcco => {subAcco.classList.remove('active')});
        acco.classList.add('active');
    }
})

// Handle review submission
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
 
    // Get form data
    const reviewerName = document.getElementById('reviewerName').value;
    const reviewText = document.getElementById('reviewText').value;
    const starRating = document.getElementById('starRating').value;
 
    // Create new review slide
    const newReviewSlide = document.createElement('div');
    newReviewSlide.classList.add('swiper-slide', 'slide');
    newReviewSlide.innerHTML = `
       <h2 class="heading">Client's Review</h2>
       <i class="fas fa-quote-right"></i>
       <p>${reviewText}</p>
       <div class="user">
          <img src="images/default-avatar.jpg" alt="${reviewerName}">
          <div class="user-info">
             <h3>${reviewerName}</h3>
             <div class="stars">
                ${'*'.repeat(starRating)}
                ${'☆'.repeat(5 - starRating)}
             </div>
          </div>
       </div>
    `;
 
    // Append new review slide
    const reviewSlider = document.querySelector('.review-slider .swiper-wrapper');
    reviewSlider.appendChild(newReviewSlide);
 
    // Reset form
    document.getElementById('reviewForm').reset();
 });


    let nameInput = document.querySelector(".reservation .container .box:nth-child(1) input");
    let emailInput = document.querySelector(".reservation .container .box:nth-child(2) input");
    let checkinInput = document.querySelector(".reservation .container .box:nth-child(3) input");
    let checkoutInput = document.querySelector(".reservation .container .box:nth-child(4) input");
    let adultsInput = document.querySelector(".reservation .container .box:nth-child(5) select");
    let childrenInput = document.querySelector(".reservation .container .box:nth-child(6) select");
    let roomsInput = document.querySelector(".reservation .container .box:nth-child(7) select");
    let roomTypeInput = document.querySelector(".reservation .container .box:nth-child(8) select");
    let type = document.querySelector("#room-type");
    let amount = document.querySelector("#room-amount");
    let checkin = document.querySelector("#checkin");
    let checkout = document.querySelector("#checkout");

    function validate() {
        if (nameInput.value == "" || emailInput.value == "" || checkinInput.value == "" || checkoutInput.value == "") {
            alert("Please fill in all the required fields.");
            return false;
        }

        return true;
    }

    function validate2() {
        if (!checkin.value || !checkout.value) {
            alert("Please fill in all the required fields.");
            return false;
        }

        return true;
    }

    async function checkAvailability() {
        if (validate2()) {
            let data = {
                "checkin": checkin.value,
                "checkout": checkout.value,
                "adults": adultsInput.value,
                "children": childrenInput.value,
                "amount": parseInt(amount.value),
                "type": type.value
            };

            let response = await fetch("https://edc-api.fly.dev/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return {};
                }
            });

            if (response) {
                alert("Available rooms: " + response.data.available);
            } else {
                alert("Failed to check availability. Please try again later.");
            }
        }
    }

    async function bookRoom() {
        if (validate()) {
            let data = {
                "name": nameInput.value,
                "email": emailInput.value,
                "checkin": checkinInput.value,
                "checkout": checkoutInput.value,
                "adults": adultsInput.value,
                "children": childrenInput.value,
                "amount": parseInt(roomsInput.value),
                "type": roomTypeInput.value
            };

            let booking_result = await fetch("https://edc-api.fly.dev/book", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return {};
                    }
                });

                if (booking_result) {
                    console.log(booking_result);

                    if (booking_result.data.status == "SUCCESS") {
                        alert("Booking Successful: RM" + booking_result.data.total);
                    } else {
                        alert("Booking failed.");
                    }
                }
    }
}



 
 