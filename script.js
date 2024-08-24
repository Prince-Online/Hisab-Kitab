$(document).ready(function() {
    $('#expenseForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: this.action,
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                alert('Expense added successfully!');
                location.reload();
            },
            error: function() {
                alert('Error adding expense. Please try again.');
            }
        });
    });
    $('#sendEmailBtn').click(function() {
        $('#emailOptions').toggle();
    });
    $('.emailOption').click(function() {
        var period = $(this).data('period');
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbznPoKN06WfX8_MtoBkPtyqknq1al9KpiQvkOqjm6NTu9WZIAz-F5ja9tnrWb4W9qOR/exec',
            method: 'POST',
            data: { action: 'sendEmail', period: period },
            success: function(response) {
                alert('Email sent successfully!');
                location.reload(); 
            },
            error: function() {
                alert('Error sending email. Please try again.');
            }
        });
    });
});