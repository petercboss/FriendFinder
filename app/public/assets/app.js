const questions =  [
    'Do you like being in the ground?', 'Can I eat you without peeling you?', 'Do you have a lot of seeds?', 'Can I eat your leaves?', 'Are you actually a fruit?',
    'Are you hanging from a tree?', 'Do you need a lot of sunlight?', 'Are you a bright color?', 'Are you juicy?', 'Can I eat you now?'
];

const currentURL = window.location.origin;

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

function findFriend(friend) {
    console.log(friend);
};

$(document).ready(() => {

$('#submit').on('click', () => {
    let scores = [];
    questions.forEach((question, i) => {
        let string = $(`#q${i + 1}`).val();
        scores.push(+string.charAt(0));
    });
    const friend = {
        name: $('#name').val().trim(),
        photo: $('#photo').val().trim(),
        scores: scores
    };
    $.post(currentURL + '/api/friends', friend, data => {
        console.log(data);
        findFriend();
    });
});

})
