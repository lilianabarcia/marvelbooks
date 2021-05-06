class Book {
    constructor(googleTitle, googlePubDate, googlePageCount, googleLanguage, googleAuthor, googleImage, googleDescription) {
        this.title = googleTitle;
        this.publishedDate = googlePubDate;
        this.pageCount = googlePageCount;
        this.language = googleLanguage;
        this.authors = googleAuthor;
        this.image = googleImage;
        this.description = googleDescription;
    }
}
let books = [];
let startIndex = 40;
let maxResults = 40;
let allBooks = [];
//element.volumeInfo.imageLinks.thumbnail,

function getDataFromGoogleBookApi() {
    $.get(`https://www.googleapis.com/books/v1/volumes?q='Marvel'&maxResults=${maxResults}&startIndex=${startIndex}`)
        .done((googleData) => {
            startIndex += maxResults;
            prepareData(googleData.items)
            //let like = books.shift()
            addBook()
        })
        .fail((googleError) => {
            console.log(googleError);
        })
}

function prepareData(googleData) {
    for (const element of googleData) {
        console.log(element);
        let noImage = "No_Image_Available.jpg";
        if (element.volumeInfo.imageLinks && element.volumeInfo.imageLinks.thumbnail) {
            noImage = element.volumeInfo.imageLinks.thumbnail;
        }
        let book = new Book(
            element.volumeInfo.title,
            element.volumeInfo.publishedDate,
            element.volumeInfo.pageCount,
            element.volumeInfo.language,
            element.volumeInfo.authors,
            noImage,
            element.volumeInfo.description
        )
        console.log(book);
        books.push(book);
    }
    for (const book of books) {
        console.log(book);
    }
}

function addBook() {
    let addBooks = books[0];
    $("#Title").html("<b>Title: </b>" + addBooks.title);
    $("#Language").html("<b>Language: </b>" + addBooks.language);
    $("#Date").html("<b>Published Date: </b>" + addBooks.publishedDate);
    $("#Author").html("<b>Author(s): </b>" + addBooks.authors);
    $("#Pages").html("<b>Pages: </b>" + addBooks.pageCount);
    $("#frontPage").attr("src", addBooks.image);
    $("#Description").html("<b>Description: </b>" + addBooks.description);
    // falta criar  link1 - ex:  $("#Link").atr("href", addBooks.infoLink);
    // falta criar  link2
    console.log(addBooks);
}


function likeBook() {
    let addBooks = books.shift();
    addBook();
    allBooks.push(addBooks);
    $("#MyLib").prepend(`<tr><td>${addBooks.title}</td></tr>`);
    //addItemsToMe();
}

function dislikeBook() {
    let addBooks = books.shift();
    addBook();
    allBooks.push(addBooks);
    $("#ThanosLib").prepend(`<tr><td>${addBooks.title}</td></tr>`);
}

function restartBooks() {
    $('#ThanosLib').empty();
    $('#MyLib').empty();

}