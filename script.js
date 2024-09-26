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
        var today = new Date();
        var endDate = new Date(today.getFullYear(), today.getMonth(), 25); // 25th of this month
        var startDate = new Date(today.getFullYear(), today.getMonth() - 1, 25); // 25th of the previous month
        var formattedStartDate = startDate.toISOString().split('T')[0];
        var formattedEndDate = endDate.toISOString().split('T')[0];
        $('#startDate').val(formattedStartDate);
        $('#endDate').val(formattedEndDate);
    });
    $('.emailOption').click(function() {
        var period = $(this).data('period');
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbycdvdHAXh-9WK2tItWVyXrJXN3LCtL5HAXkSV65SU4jZkxiWy7gXmxJ104XM9jRT5I/exec',
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
    $('#customRangeBtn').click(function() {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbzKIgXiqA_LQNdhFlWoL8zwmHkoLJiN6yZN_IxGWb7MWPJxMylqTIpWJcmfbwv45Mpm/exec',
            method: 'POST',
            data: {
                action: 'sendEmail',
                startDate: startDate,
                endDate: endDate
            },
            success: function(response) {
                alert('Custom report generated successfully!');
                location.reload();
            },
            error: function() {
                alert('Error generating report. Please try again.');
            }
        });
    });
});
