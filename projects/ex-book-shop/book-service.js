var gBooks = []
var gId = 1
var gCurrPageIdx = 0
const PAGE_SIZE = 3

function getBooks() {

    var fromIdx = gCurrPageIdx * PAGE_SIZE
    var books = gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
    return books
}

function createBooks() {
    gBooks = [
        createBook('Harry Potter and the chamber of secrets', 20, './images/secret.jpg'),
        createBook('Harry Potter and the prisoner of azkaban', 25, './images/azkaban.jpg'),
        createBook('Harry Potter and the sourceres stone', 30, './images/stone.jpg'),
        createBook('Harry Potter and the goblet of fire', 10, './images/goblet.jpg'),
        createBook('Harry Potter and the half prince', 42, './images/half.jpg'),
        createBook('Harry Potter and the deathly hallows', 66, './images/deathly.jpg')
    ]
}

function createBook(title, price, image) {
    return {
        id: gId++,
        title: title,
        price: price,
        image: image,
        rate: 0
    }
}

function deleteBook(bookId) {
    var bookIdx = getBookIdx(bookId)
    gBooks.splice(bookIdx, 1)
}



function displayUpdateModal(bookId) {
    
    var bookIdx = getBookIdx(bookId)
    var [book] = gBooks.slice(bookIdx, bookIdx + 1)
    $('.update-modal h5 .id-container').text(`${bookId}`)
    $('#u-title-input').val(`${book.title}`)
    $('#u-price-input').val(`${book.price}`)
    $('#u-image-input').val(`${book.image}`)
    console.log(bookId);
    

}

function saveUpdatedChanges() {
    // debugger
    var bookId = +($('.update-modal h5 .id-container').text())
    var bookIdx = getBookIdx(bookId)
   
    gBooks[bookIdx].title = $('#u-title-input').val()
    gBooks[bookIdx].price = $('#u-price-input').val()
    gBooks[bookIdx].image = $('#u-image-input').val()
}



function displayReadModal(bookId) {
    var bookIdx = getBookIdx(bookId)
    var [book] = gBooks.slice(bookIdx, bookIdx + 1)

    $('.read-modal h5 .id-container').text(`${bookId}`)
    $('#read-title').html(`${book.title}`)
    $('#read-price').html(`${book.price}`)
    $('#read-images').html(`${book.image}`)
    $('.rate-num').html(`${book.rate}`)
}

function changeRate(sign) {
    var bookId = +($('.read-modal h5 .id-container').text())
    var bookIdx = getBookIdx(bookId)
    var book = gBooks[bookIdx]


    if (sign === '+' && book.rate < 10) {
        book.rate++
        $('.rate-num').html(`${book.rate}`)
    }
    if (sign === '-' && book.rate > 0) {
        book.rate--
        $('.rate-num').html(`${book.rate}`)
    }
}

function addBook(name, price, image) {
    gBooks.push(createBook(name, price, image))

}


function sortBy(by) {

    if (by === 'id') {
        gBooks.sort((book1, book2) => {
            return book1.id > book2.id ? 1 : -1
        })
        gSortDir = by
    }
    if (by === 'title') {
        gBooks.sort((book1, book2) => {
            return book1.title > book2.title ? 1 : -1
        })
        gSortDir = by
    }
    if (by === 'price') {
        gBooks.sort((book1, book2) => {
            return book1.price > book2.price ? 1 : -1
        })
        gSortDir = by
    }


}

function nextPage() {
    if ((gBooks.length / PAGE_SIZE) - 1 > gCurrPageIdx) gCurrPageIdx++
}

function prevPage() {
    if (gCurrPageIdx > 0) gCurrPageIdx--
}

function numOfPage() {
    var numPages = gBooks.length / PAGE_SIZE;
    var counter = 0;
    var button = ''
    while (numPages > counter) {
        counter++;
        button += `<button onclick="onNextPage()" class="btn btn-light">${counter}</button>`
    }
    $('#prevNextIndx').html(button)
}