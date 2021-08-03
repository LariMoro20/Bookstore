import '../App.css';
import { useHistory } from "react-router-dom";
import React from "react";

export default function Home({ handleFavAdd, handleFavDelete, favorites }) {
    const [books, setBooks] = React.useState([]);
    const [bookInput, setBookInput] = React.useState('');
    const history = useHistory();
    function getBook(idbook) {
        if (bookInput.length > 0) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${idbook}`)
                .then((res) => {
                    return res.json();
                })
                .then((respComplete) => {
                    if (respComplete.totalItems > 0) {
                        setBooks(respComplete.items);
                    }
                    else {
                        setBooks([]);
                    }
                    console.log(respComplete)
                }).catch(() => {
                    console.log('Houve algum erro')
                })
        } else {

        }
    }

    const removeFavorite = (id) => {
        handleFavDelete(id);
    };

    const addFavorite = (id, title) => {
        handleFavAdd(id, title);
    };

    return (
        <div className="row">
            <div className="books_form row">
                <div className=" col-md-4"></div>
                <div className="books_form col-md-4">
                    <h2>Consulta de livros por ISBN</h2>
                    <form onSubmit={(info) => {
                        info.preventDefault();
                        getBook(bookInput)
                    }}>
                        <input type='text' placeholder='ISBN Ex.: 144934013X' className='form-control'
                            onChange={(e) => {
                                setBookInput(e.target.value)
                            }}
                        />
                        {bookInput.length === 0
                            ? 'Preencha o campo'
                            : ''
                        }<br />
                        <input className='form-control' type='submit' value='Procurar' />
                    </form>
                </div>
                <div className=" col-md-4"></div>
            </div>

            <div className=" row">
                <div className='books_list col-md-6 row'>
                    <h3>Livros encontrados</h3>
                    {books.map((book) => {
                        return (
                            <div className='books_list-item col-md-6 row' key={book.id}>
                                <div className='col-md-12'>
                                    <img alt='book' src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'} />
                                </div>
                                <div className='col-md-12'>
                                    <p><b>Nome:</b>{book.volumeInfo.title}<br />
                                        <b>Autores:</b>

                                        {book.volumeInfo.authors.map((auth) => {
                                            return (
                                                <span>{auth}</span>
                                            )
                                        })}
                                        <br />
                                        <b>ISBN's:</b>
                                        {book.volumeInfo.industryIdentifiers.map((ident) => {
                                            return (
                                                <span>{ident.identifier}, </span>
                                            )
                                        })}

                                    </p>
                                </div>
                                <div className='col-md-12 text-center'>
                                    <button onClick={() => history.push(`/details/${book.volumeInfo.industryIdentifiers[0].identifier}`)}>Detalhes</button>
                                    <button onClick={() => addFavorite(book.volumeInfo.industryIdentifiers[0].identifier, book.volumeInfo.title)}>Favorito</button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='books_fav col-md-6 row'>
                    <div className='col-md-12'>
                        <h3>Livros favoritos</h3>
                    </div>
                    {favorites.map((book) => {
                        return (
                            <div className='col-md-6' key={book.id}>
                                <p><b>Nome:</b>{book.title}<br />
                                    <b>Id:</b>{book.id}<br />
                                    <button onClick={() => removeFavorite(book.id)}>Remover Favorito</button>
                                </p>
                            </div>
                        );
                    })}

                </div>

            </div>

        </div>
    );
}

