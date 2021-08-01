import React from "react";
import '../App.css'
function Details(props) {
    const [books, setBooks] = React.useState([]);


    React.useEffect(() => {

        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${props.match.params.id}`)
            .then((res) => {
                return res.json();
            })
            .then((respComplete) => {
                if (respComplete.totalItems > 0)
                    setBooks(respComplete.items);
            }).catch(() => {
            })
    }, []);

    return (
        <div className="row">

            <div className='books_detail col-md-12'>

                {books.map((book) => {
                    return (
                        <div className='col-md-12 row books_detail' key={book.id}>
                            <div className='col-md-12 text-center'>
                                <h3>Descrição do livro {book.volumeInfo.title}</h3>
                            </div>
                            <div className='col-md-4'>
                                <img alt='book' src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'} />
                            </div>
                            <div className='col-md-8'>
                                <p><b>Nome: </b>{book.volumeInfo.title}<br />
                                    <b>Descrição: </b>{book.volumeInfo.description}<br />
                                    <b>Linguagem: </b>{book.volumeInfo.language}<br />
                                    <b>Link: </b><a href={book.volumeInfo.previewLink}>{book.volumeInfo.previewLink}</a><br />
                                    <b>Publicado por: </b>{book.volumeInfo.publisher}<br />
                                    <b>Publicação: </b>{book.volumeInfo.publishedDate}<br />
                                    <b>Páginas: </b>{book.volumeInfo.pageCount}<br />

                                    <b>Categorias: </b>
                                    <ul>
                                        {book.volumeInfo.categories.map((cat) => {
                                            return (
                                                <li>{cat}</li>
                                            )
                                        })}
                                    </ul>

                                    <b>Autores:</b>
                                    <ul>
                                        {book.volumeInfo.authors.map((auth) => {
                                            return (
                                                <li>{auth}</li>
                                            )
                                        })}
                                    </ul>
                                    <b>ISBN's:</b>
                                    {book.volumeInfo.industryIdentifiers.map((ident) => {
                                        return (
                                            <span>{ident.identifier}, </span>
                                        )
                                    })}

                                </p>
                            </div>
                            <div className='col-md-12 text-center'>
                                <hr />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Details;
