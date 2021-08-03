import '../App.css';
import React from "react";

export default function Favorites({ handleFavDelete, favorites }) {

    const removeFavorite = (id) => {
        handleFavDelete(id);
    };

    return (
        <div className="row">
            <div className=" row">
                <div className='books_fav col-md-12 row'>
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

