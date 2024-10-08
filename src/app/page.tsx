import { Product } from "@/utils/types/produts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./services/firebaseConnection";

async function fetchProducts(){
  try {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const products: Product[] = productSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      image: doc.data().imageUrl,
      price: doc.data().price
    }));
    return products
  } catch (error) {
    throw new Error("Error to fetch products")
  }
}

export default async function Home() {
  const products: Product[] = await fetchProducts()

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;
