import React, {Component} from 'react';
import api from '../../services/api';
import './style.css';
import {Link} from 'react-router-dom';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page:1,
    };
    componentDidMount(){
        this.loadProducts();
    };

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ... productInfo } = response.data;

        this.setState({ products: docs, productInfo, page});

    };

    prevPage = () => {
        const {page, productInfo } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);

    }

    nextPage = () => {
        const {page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
        
    }

    render () {
        const {products, page, productInfo} = this.state;
        return (            
            <section className='product-list'>
            {products.map(product =>(
                <article className='listProduct' key={product._id}>
                <strong>{product.title}</strong>
                <p className='paragraph'>{product.description}</p>
                <Link to={`/products/${product._id}`} className='direcionar'>Acessar</Link>
                </article>
            ))}
                <section className='action'>
                    <button className='btn' disabled={page=== 1} onClick={this.prevPage}>Anterior</button>
                    <button className='btn' disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </section>
    
            </section>
            
        )
        
    };
};
{/* <h1>Contagem de produtos: {this.state.products.length}</h1> */}