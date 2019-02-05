function init() {
    createBooks()
    numOfPage()
    renderBooks()
    doTrans();
    
}



function renderBooks() {
    var books = getBooks()
    
    var strHtml = books.map((book) => {
        return `<tr>
        <th  scope="row">${book.id}</th>
        <td id="b-title" >${book.title}</td>
        <td id="b-price">${book.price}$</td>
        <td id="b-image"> <img class='book-image' src="${book.image}" alt=""> </td>
        <td class="td-action"><button class="btn btn-success" onclick="onOpenReadModal(${book.id})"  data-toggle="modal" data-target="#readleModal" data-trans="read-button">READ</button> 
        <button onclick="onOpenUpdateModal(${book.id}) " class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-trans="update-button" >UPDATE</button> 
        <button onclick="onDeleteBook(${book.id})" class="btn btn-danger"  data-trans="delete-button" >DELETE</button></td>
        </tr>`
    })
    $('tbody').html(strHtml.join(''))

}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    doTrans()

}

function onOpenUpdateModal(bookId) {
    displayUpdateModal(bookId)
}


function onOpenReadModal(bookId) {
    displayReadModal(bookId)
}
function onUpdateSaveChanges() {
    
    saveUpdatedChanges()
    renderBooks()
    doTrans()
}


function onRate(sign) {
    changeRate(sign)
}

function onOpenModal() {
    $('.add-modal').show()
}

function onCloseModal() {
    $('.add-modal').hide()
}

function onModalSaveBook() {
    var name = $('#name-input').val()
    var price = $('#price-input').val()
    var image = $('#image-input').val()
    addBook(name, price, image)
    renderBooks()
    doTrans()
}

function onSortBy(by) {
    sortBy(by)
    renderBooks()
    doTrans()

}

function onNextPage() {
    nextPage()
    renderBooks()
    doTrans();

    
}
function onPreviusPage() {
    prevPage()
    renderBooks()
    doTrans();

}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
        $('form').addClass('float-right')
        $('.modal-body h3').addClass('text-right')
        // document.form.classList.add('float-right')

    } else {
        document.body.classList.remove('rtl')
        $('form').removeClass('float-right')
        $('.modal-body h3').removeClass('text-right')
        // document.form.classList.remove('float-right')
    }
    doTrans();
    // renderBooks();
}