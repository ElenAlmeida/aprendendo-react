import React, {Component} from 'react';
import api from '../../services/api';
import './style.css'; 

export default class Product extends Component{
    state = {
        product: {}
    };

    async componentDidMount(){
        const {id} = this.props.match.params;

        const response = await api.get(`/products/${id}`);
        this.setState({ product: response.data});
    }

    render() {
        const {product} = this.state;

        return (
            <section className='product-info'>
                <h1 className='title'>{product.title}</h1>
                <p className='paragraph'>{product.description}</p>

                <p>
                URL: <a href={product.url} className='link'>{product.url}</a>
                </p>

            </section>
        )
    };
};