import Link from "next/link";

import api from "@/api";

export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const restaurant = await api.fetch(id);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}

// El renderizado estático es muy útil para páginas que no cambian con frecuencia o no incluyen información proveniente de la petición.
export async function generateStaticParams() {
  const restaurants = await api.list();

  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default async function RestaurantPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const restaurant = await api.fetch(id);

  return (
    <article key={restaurant.id}>
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex gap-2 text-lg font-bold">
        <span>{restaurant.name}</span>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
      <Link className="font-bold" href="/">
        Volver
      </Link>
    </article>
  );
}
