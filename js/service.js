var gProj = []


function createProjs() {
    gProj = [
        createProj('Mine-Sweeper', 'Mine Sweeper', 'Mine Sweeper', 'Nice game about discovering eliminating mines', 'projects/images/Mine-Sweeper.png', '30.01.19', ['matrix', 'game', 'events'], 'projects/Mine Sweeper/index.html'),
        createProj('Pacman', 'Pacman', 'Pacman', 'The old school game that everyone love!', 'projects/images/pacman.png', '27.01.19', ['matrix', 'game', 'events'], 'projects/pacman/index.html'),
        createProj('Chess', 'Chess', 'Chess', 'best thinking game - Chess!', 'projects/images/chess.png', '25.01.19', ['matrix', 'game', 'events'], 'projects/chess/index.html'),
        createProj('Touch-nums', 'Touch-nums', 'Touch-nums', 'give a chance to your refleces', 'projects/images/touch-nums.png', '23.01.19', ['matrix', 'game', 'events'], 'projects/touch-nums/index.html'),
        createProj('Book-shop', 'Book-shop', 'Book-shop', 'Take a look on the books', 'projects/images/book.png', '23.01.19', ['matrix', 'game', 'events'], 'projects/ex-book-shop/index.html')
    ]
}

function createProj(id, name, title, desc, url, publishedAt, labels, link) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: publishedAt,
        labels: labels,
        link: link
    }

}

function sendEmail() {
    var name = $('#contact-name').val();
    var email = $('#contact-email').val();
    var subj = $('#contact-subject').val();
    var body = $('#contact-body').val();
    console.log(name, body);

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subj}&body=${body}`);

}