import React, { useEffect, useState } from 'react'
import SelectFilter from './components/SelectFilter'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ColumnDef } from '@tanstack/react-table'
import { ProductTable } from './components/ProductTable'
import Cart from './components/Cart'
import { useNavigate } from 'react-router-dom'
import { BookCard } from './components/BookCard'

type Props = {}
export type Products ={
    id: string;
    bookName: string;
    bookImage:string;
    bookReadingStatus:number;
    bookType: string;
    isUnread: boolean;
}

 


export type Cart ={
    productsCart: ProductsCart[];
    shipAddress: string;
}
export type ProductsCart ={
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const Home = (props: Props) => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [books, setBooks] = useState<Products[]>([]);
    const [cart, setCart] = useState<ProductsCart[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://67dff1467635238f9aabe2cf.mockapi.io/books');
            if(response.status === 200){
                setBooks(response.data);
            }
        }
        fetchData();
    }, []);

    
const bookTorender = books.filter((book: Products) => book.bookReadingStatus === 2)

  return (

    <div>
        <div className='my-4 mb-10'>
            BOOKS SYSTEMS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {bookTorender.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
    </div>
    
  )
}

export default Home