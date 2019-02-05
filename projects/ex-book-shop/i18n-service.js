var gTrans = {
    'Add-book': {
        en: 'Add book',
        he: 'הוסף ספר'
    },
    'thead-id': {
        en: 'Id',
        he: 'מספר סידורי'
    },
    'thead-title': {
        en: 'Title',
        he: 'שם'
    },
    'thead-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'thead-image': {
        en: 'Image',
        he: 'תמונה'
    },
    'thead-action': {
        en: 'Action',
        he: 'אפשרויות פעולה'
    },
    'previus-Page': {
        en: 'Previus Page',
        he: 'עמוד קודם'
    },
    'next-Page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'add-book-Modal-title': {
        en: 'Modal title',
        he: 'הוספת ספר '
    },
    'add-book-title': {
        en: 'Book title',
        he: 'שם הספר'
    },
    'add-book-price': {
        en: 'Book price',
        he: 'מחיר הספר'
    },
    'add-book-image': {
        en: 'Book image',
        he: 'תמונת הספר'
    },
    'add-book-save-changes': {
        en: 'Save changes',
        he: 'שמור שינויים'
    },
    'add-book-close': {
        en: 'Close',
        he: 'סגור'
    },
    'update-book-title-id': {
        en: 'UPDATE MODE - Book Id: ',
        he: ' מצב עדכון לספר מספר:'
    },
    'update-book-title': {
        en: 'Book title',
        he: 'שם הספר:'
    },
    'update-book-price': {
        en: 'Book price',
        he: 'מחיר הספר:'
    },
    'update-book-image': {
        en: 'Book image',
        he: 'תמונת הספר:'
    },
    'update-book-close': {
        en: 'Close',
        he: 'סגור'
    },

    'update-book-save-changes': {
        en: 'Save changes',
        he: 'שמור שינויים'
    },
    'read-book-title': {
        en: 'READ MODE - Book Id:',
        he: 'מצב קריאה לספר מספר:'
    },
    'read-book-name': {
        en: 'Book name: ',
        he: 'שם הספר:'
    },
    'read-book-price': {
        en: 'Book Price: ',
        he: 'מחיר הספר:'
    },
    'read-book-image': {
        en: 'Book Images: ',
        he: 'תמונת הספר:',
    },
    'read-book-close': {
        en: 'Close',
        he: 'סגור'
    },
    'read-book-save-changes': {
        en: 'Save changes',
        he: 'שמור שינויים'
    },
    'update-button': {
        en: 'UPDATE',
        he: 'עדכן'
    },
    'read-button': {
        en: 'READ',
        he: 'קרא'
    },
    'delete-button': {
        en: 'DELETE',
        he: 'מחק'
    }
}
var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
      
        el.innerText = txt;
        
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

