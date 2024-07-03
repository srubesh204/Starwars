"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Image, Text, Skeleton, Card, CardBody, Stack, Heading, Divider, Button, CardFooter, ButtonGroup } from '@chakra-ui/react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';


const CharacterCard = ({ character, toggleFavorite, isFavorite }) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBoxClick = () => {
    router.push(`/character/${character.url.split('/')[5]}`);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevent the box click event
    toggleFavorite(character);
  };

  return (
    <Box
      onClick={handleBoxClick}
      className='box-card'
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={0}
    >
      {!imageLoaded && <Skeleton height="250px" />}
      <Image
        src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`}
        alt={character.name}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      <Text className='text-center chaText' m={2}>{character.name}</Text>
      <div className='favouritesSection'>
        <button className='favBtn' onClick={handleButtonClick}>
          {isFavorite ? <FcLike /> : <FcLikePlaceholder />}
        </button>
      </div>
    </Box>

    // <Card onClick={handleBoxClick} cursor={"pointer"} maxW='sm' variant={'elevated'} bgColor={'gray.700'} p={0} color={'white'} borderRadius={5}>
    //   <CardBody p={0} borderRadius={5}>
    //     <Image
    //       borderRadius={5}
    //       src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`}
    //       alt={character.name}
    //       onLoad={() => setImageLoaded(true)}
    //       style={{ display: imageLoaded ? 'block' : 'none' }}
    //     />
    //     <Stack mt='6' align={'center'} m={5}>
    //       <Heading size='md'>{character.name}</Heading>
    //     </Stack>
    //   </CardBody>
    // </Card>
  );
};

export default CharacterCard;
