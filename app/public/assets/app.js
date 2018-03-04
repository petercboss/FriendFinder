const questions =  [
    'Do you like being in the ground?', 'Can I eat you without peeling you?', 'Do you have a lot of seeds?', 'Can I eat your leaves?', 'Are you actually a fruit?',
    'Are you hanging from a tree?', 'Do you need a lot of sunlight?', 'Are you a bright color?', 'Are you juicy?', 'Can I eat you now?'
];

questions.forEach((question, i) => {
$('.survey').append(`
    <div class="row col-md-6">
        <h4>Question ${i + 1}</h4>
        <h4>${question}</h4>
        <div class="form-group col-md-6 col-md-offset-3">
            <select id="q${i + 1}" class="form-control" >
                <option>1 (Not Me At All)</option>
                <option>2</option>
                <option selected="selected">3 (Kind Of)</option>
                <option>4</option>
                <option>5 (All ME)</option>
            </select>
        </div>
    </div>
`)});

$(document).ready(() => {

    $('#submit').on('click', event => {
        event.preventDefault();
        let scores = [];
        if ($('#name').val() !== '' && $('#photo').val() !== '') {
            questions.forEach((question, i) => {
                let string = $(`#q${i + 1}`).val().substring(0,1);
                scores.push(+string);
            });

            const friend = {
                name: $('#name').val().trim(),
                photo: $('#photo').val().trim(),
                scores: scores
            };

            const currentURL = window.location.origin;
            $.get(currentURL + '/api/friends', res => {
                let currentMatch = 40;
                let bestMatch;
                let compareArray = [];
                res.forEach(i => {
                    scores.forEach(j => {
                        compareArray.push(Math.abs(scores[j] - i.scores[j]));
                    });
                    let compareEach = compareArray.reduce((a, b) => a + b, 0);
                    if (compareEach < currentMatch) {
                        bestMatch = i;
                        currentMatch = compareEach;
                        compareArray = [];
                        console.log(bestMatch);
                    }
                    else {
                        compareArray = [];
                    };    
                }); 
                $.post(currentURL + '/api/friends', friend, data => {});
                $('#display').html(`${bestMatch.name.toUpperCase()}<img src="${bestMatch.photo}" width="300" height="300">`);
                $('#modal').modal('show');
                $('#reset').on('click', () => {
                    window.location.reload();
                });
            });
        };
    });

})
