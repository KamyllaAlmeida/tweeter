$(document).ready(() => {
    $('textarea').on('keyup', function (event) {
        const charRemaining = 140 - $(this)[0].textLength;
        const $counter = $(this).parent('form').children('.counter');
        $counter[0].innerHTML = charRemaining;
        if (charRemaining < 0) {
            $counter.addClass('reachedMax');
        } else {
            $counter.removeClass('reachedMax');
       }
   });
});


