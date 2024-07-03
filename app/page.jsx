"use client"
import { Card, CardHeader, CardBody, CardFooter, Container, Spinner, SimpleGrid } from '@chakra-ui/react'
import { Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import CharacterCard from './components/CharacterCard';
import Pagination from './components/Pagination';



const Home = () => {

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setCharacters(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    fetchData('https://swapi.dev/api/people/');
  }, []);

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.includes(character.name)
      ? favorites.filter(fav => fav !== character.name)
      : [...favorites, character.name];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-middle h-100'>
        <div class="loader h-100"></div>
      </div>
    )
  }

  return (
    <Container maxWidth={"1200px"}>
      <Box p={5}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} padding={0}>
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              isFavorite={favorites.includes(character.name)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </SimpleGrid>
        <Pagination nextPage={nextPage} prevPage={prevPage} fetchData={fetchData} />
      </Box>
    </Container>
  );
}

export default Home