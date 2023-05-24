import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import {
  type PokemonGameState,
  PokemonGameContext,
} from './pokemon-game.context';
import {
  type PokemonListState,
  PokemonListContext,
} from './pokemon-list.context';

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: true,
    showBackImage: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame); // inicializo el contexto con  lo que defino en pokemonGame
  useContextProvider(PokemonListContext, pokemonList);

  return <Slot />;
});
