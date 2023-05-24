import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import type { PokemonGameState, PokemonListState } from '~/context';
import { PokemonGameContext, PokemonListContext } from '~/context';

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: true,
    showBackImage: false,
  });

  useContextProvider(PokemonGameContext, pokemonGame); // inicializo el contexto con  lo que defino en pokemonGame

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonListContext, pokemonList);

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
