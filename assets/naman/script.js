// Booking form confirmation
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const confirmation = document.getElementById('confirmation');
    if (bookingForm && confirmation) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            confirmation.classList.remove('hidden');
            confirmation.innerHTML = `
                <div class="confirmation-message">
                    <h3>Thank you for your booking!</h3>
                    <p>We have received your request and will contact you soon.</p>
                </div>
            `;
            bookingForm.reset();
        });
    }

    // Contact form demo
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactForm.innerHTML = `
                <div class="confirmation-message">
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you soon.</p>
                </div>
            `;
        });
    }
});