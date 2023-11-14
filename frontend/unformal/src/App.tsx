import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import axios from 'axios';

interface Product {
  title: string;
  id: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    title: '',
    id: 0,
  });
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    const { data } = await axios.get<{ payload: Product[] }>('http://localhost:8081/products');
    setProducts(data.payload);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:8081/products/${id}`);
    fetchProducts();
  };
  
  const handleUpdateProduct = async (id: number) => {
    try {
      await axios.put(`http://localhost:8081/products/${id}`, { title: newProduct.title });
      fetchProducts();
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleCreateProduct = async (newProduct: Product) => {
    try {
      const { data } = await axios.post(`http://localhost:8081/products`, newProduct);
      fetchProducts();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.title.trim() === '') {
      setError('Enter title');
      return;
    }
    handleCreateProduct(newProduct);
    setNewProduct({ title: '', id: 0 });
  };

  return (
    <>
     <ToastContainer />
      <h2>{products.length}</h2>
     
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct((prevState) => {
              return { ...prevState, [e.target.name]: e.target.value };
            })
          }
          placeholder="Enter product title"
        />
        {error !== '' && <div>{error}</div>}
        <button type="submit">Create</button>
      </form>

      {products.length > 0 &&
        products.map((product) => (
          <article key={product.id}>
            <h2>{product.title}</h2>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
          </article>
        ))}
    </>
  );
}

export default App;