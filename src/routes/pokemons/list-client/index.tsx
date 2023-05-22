import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

// import styles from '../../styles.css?inline'
interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  // useStylesScoped$(styles); //aplica los estilos solo para el componente

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: true,
    pokemons: [],
  });

  // useVisibleTask$(async ({ track }) => {
  //   // el track es para que no solo se ejecute cuando se crea el componente
  //   // entra cuando se genera el componente
  //   // esto solo se ejecuta del lado del cliente
  //   track(() => pokemonState.currentPage); // con el track lo que dice aca es que useVisibleTask se va a disparar cada vez que cambie pokemonState.currentPage
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //       pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage); // con el track lo que dice aca es que useVisibleTask se va a disparar cada vez que cambie pokemonState.currentPage
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    }),
  );
  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual: {pokemonState.currentPage}</span>
        <span>Esta cargando:</span>
      </div>
      <div class="mt-10">
        {/* <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </button> */}
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'List Client',
};
