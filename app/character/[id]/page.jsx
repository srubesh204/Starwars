// app/character/[id].js
"use client";


import { useState, useEffect, Fragment } from 'react';
import { Box, Spinner, Image, Text, SimpleGrid, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, Grid, GridItem, Stack, HStack, Badge, Divider, AbsoluteCenter, Code, List, ListItem, ListIcon, WrapItem, Wrap } from '@chakra-ui/react';
import axios from 'axios';
import { ArrowRightIcon, ChevronRightIcon } from '@chakra-ui/icons';


const CharacterDetail = ({ params }) => {

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            axios.get(`https://swapi.dev/api/people/${params.id}/`)
                .then(response => {
                    setCharacter(response.data);
                    setLoading(false);
                });
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-middle h-100'>
                <div class="loader h-100"></div>
            </div>
        )
    }

    

    return (
        <Container maxW={"1300px"}>

            <Box>
                <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={`character/${character.url.split('/')[5]}`}>Breadcrumb</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={5}>
                <GridItem className='d-flex justify-content-center' alignItems='center' borderRadius={5} colSpan={1}>
                    <Image
                        borderRadius={5}
                        src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`}
                        alt={character.name}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <Heading as='h2' size='2xl'>
                        {character.name}
                    </Heading>

                    <Divider />


                    <Wrap my={3} direction='row'>
                        <WrapItem><Badge p={1}>Height : {character.height}</Badge></WrapItem>
                        <WrapItem><Badge p={1} colorScheme='green'>Weight : {character.mass}</Badge></WrapItem>
                        <WrapItem><Badge p={1} colorScheme='red'>Hair Color : {character.hair_color}</Badge></WrapItem>
                        <WrapItem><Badge p={1} colorScheme='purple'>Skin Color : {character.skin_color}</Badge></WrapItem>
                        <WrapItem><Badge p={1} colorScheme='red'>Eye Color : {character.eye_color}</Badge></WrapItem>
                    </Wrap>
                    {character && character.films.length > 0 && <Fragment>
                        <Heading as='h3' size='lg'>
                            Movies
                        </Heading>
                        <List spacing={3}>
                            {character && character.films.map((item, index) => (
                                <ListItem key={index}><ListIcon as={ArrowRightIcon} color='green.500' />

                                    {item}
                                </ListItem>
                            ))}
                        </List>
                    </Fragment>}
                    {character && character.species.length > 0 && <Fragment>
                        <Divider />

                        <Heading as='h3' size='lg'>
                            Species
                        </Heading>
                        <List spacing={3}>
                            {character && character.species.map((item, index) => (
                                <ListItem key={index}><ListIcon as={ArrowRightIcon} color='green.500' /> {item}</ListItem>
                            ))}
                        </List>
                    </Fragment>}
                </GridItem>
            </Grid>
        </Container>
    );
};

export default CharacterDetail;
