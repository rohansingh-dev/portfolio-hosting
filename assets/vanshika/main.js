document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const result = document.getElementById('bookingResult');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Demo data integration: just show a confirmation message
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            result.textContent = `Thank you, ${name}! Your table for ${guests} on ${date} at ${time} is booked. (Demo data - Modern Restaurant India)`;
            form.reset();
        });
    }
});
