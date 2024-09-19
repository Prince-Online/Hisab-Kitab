$(document).ready(function() {
    function showLoader(element) {
        var originalText = element.html();
        element.data('original-text', originalText);
        element.prop('disabled', true).html('<span class="loader"></span>');
    }

    function hideLoader(element) {
        var originalText = element.data('original-text');
        element.prop('disabled', false).html(originalText);
    }

    $('#expenseForm').submit(function(e) {
        e.preventDefault();
        var submitBtn = $(this).find('button[type="submit"]');
        showLoader(submitBtn);

        $.ajax({
            url: this.action,
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                hideLoader(submitBtn);
                alert('Expense added successfully!');
                $('#expenseForm')[0].reset(); // Reset the form
            },
            error: function() {
                hideLoader(submitBtn);
                alert('Error adding expense. Please try again.');
            }
        });
    });

    $('#sendEmailBtn').click(function() {
        $('#emailOptions').toggle();
    });

    $('.emailOption').click(function() {
        var period = $(this).data('period');
        var button = $(this);
        showLoader(button);

        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbz3NzbaAntDkk1FmmzWs-0oh9oQpMWZ6UYo4ejlQb0BdNizmjL0hbgp2_NRfclRfJQt/exec',
            method: 'POST',
            data: { action: 'sendEmail', period: period },
            success: function(response) {
                hideLoader(button);
                alert('Email sent successfully!');
                $('#emailOptions').hide(); // Hide options after sending
            },
            error: function() {
                hideLoader(button);
                alert('Error sending email. Please try again.');
            }
        });
    });

    // Add input validation
    $('input[name="amount"]').on('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });

    // Prevent form submission on Enter key
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});
